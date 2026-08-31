(() => {
  "use strict";

  const MARKERS = {
    nable: ["Pain", "Objection", "Need", "Competitor", "Next Step"],
    mortgage: ["Objective", "Concern", "Documents", "Lender", "Next Step"],
  };
  const DOMAIN_LABEL = { nable: "N-ABLE", mortgage: "MORTGAGE" };
  const DOMAIN_MODE = { nable: "nable-call", mortgage: "mortgage-call" };

  const screens = {};
  document.querySelectorAll(".screen").forEach((el) => (screens[el.id] = el));

  function showScreen(id) {
    Object.values(screens).forEach((el) => el.classList.add("hidden"));
    screens[id].classList.remove("hidden");
  }

  function go(target) {
    if (target === "home") return goHome();
    if (target === "quick") return goQuick();
    if (target === "call-start") return; // handled by click handler (needs domain)
  }

  document.querySelectorAll("[data-go]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.go;
      if (target === "call-start") {
        openCallStart(btn.dataset.domain);
      } else {
        go(target);
      }
    });
  });

  // ---------- draft storage ----------

  const DRAFT_KEYS = ["quick-note", "nable-call", "mortgage-call"];

  function draftKey(mode) {
    return `sb_draft_${mode}`;
  }

  function saveDraft(mode, data) {
    localStorage.setItem(draftKey(mode), JSON.stringify({ ...data, savedAt: Date.now() }));
  }

  function loadDraft(mode) {
    const raw = localStorage.getItem(draftKey(mode));
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  function clearDraft(mode) {
    localStorage.removeItem(draftKey(mode));
  }

  function findAnyDraft() {
    for (const mode of DRAFT_KEYS) {
      const draft = loadDraft(mode);
      if (draft) return { mode, draft };
    }
    return null;
  }

  // ---------- home ----------

  function goHome() {
    renderResumeBanner();
    showScreen("screen-home");
  }

  function renderResumeBanner() {
    const banner = document.getElementById("resume-banner");
    const found = findAnyDraft();
    if (!found) {
      banner.classList.add("hidden");
      banner.innerHTML = "";
      return;
    }
    const { mode, draft } = found;
    const when = new Date(draft.savedAt).toLocaleTimeString();
    banner.classList.remove("hidden");
    banner.innerHTML = `<span>Unsaved ${mode} draft from ${when}</span>`;
    const resumeBtn = document.createElement("button");
    resumeBtn.textContent = "Resume";
    resumeBtn.addEventListener("click", () => resumeDraft(mode, draft));
    const discardBtn = document.createElement("button");
    discardBtn.textContent = "Discard";
    discardBtn.addEventListener("click", () => {
      clearDraft(mode);
      renderResumeBanner();
    });
    banner.appendChild(resumeBtn);
    banner.appendChild(discardBtn);
  }

  function resumeDraft(mode, draft) {
    if (mode === "quick-note") {
      goQuick(draft);
    } else {
      const domain = mode === "nable-call" ? "nable" : "mortgage";
      openCallStart(domain, draft);
    }
  }

  // ---------- quick note ----------

  const quickTitle = document.getElementById("quick-title");
  const quickBody = document.getElementById("quick-body");
  const quickSavedHint = document.getElementById("quick-saved-hint");

  function goQuick(draft) {
    quickTitle.value = draft ? draft.title || "" : "";
    quickBody.value = draft ? draft.body || "" : "";
    quickSavedHint.textContent = "";
    showScreen("screen-quick");
    quickBody.focus();
  }

  function persistQuickDraft() {
    if (!quickTitle.value && !quickBody.value) {
      clearDraft("quick-note");
      quickSavedHint.textContent = "";
      return;
    }
    saveDraft("quick-note", { title: quickTitle.value, body: quickBody.value });
    quickSavedHint.textContent = "Draft saved locally";
  }

  quickTitle.addEventListener("input", persistQuickDraft);
  quickBody.addEventListener("input", persistQuickDraft);

  document.getElementById("quick-save").addEventListener("click", async () => {
    const body = quickBody.value.trim();
    if (!body) {
      quickBody.focus();
      return;
    }
    const payload = { mode: "quick-note", title: quickTitle.value.trim(), body };
    const result = await capture(payload);
    if (result.ok) {
      clearDraft("quick-note");
      showSaved(`Saved to Inbox\n${result.filename}`);
    } else {
      quickSavedHint.textContent = `Save failed: ${result.message}`;
    }
  });

  // ---------- sales call ----------

  const callStartTitle = document.getElementById("call-start-title");
  const callAccount = document.getElementById("call-account");
  const callContact = document.getElementById("call-contact");
  const callPurpose = document.getElementById("call-purpose");

  let currentDomain = null;
  let liveNotes = [];
  let liveStartedAt = null;
  let activeMarker = null;
  let timerHandle = null;

  function openCallStart(domain, draft) {
    currentDomain = domain;
    callStartTitle.textContent = `START ${DOMAIN_LABEL[domain]} CALL`;
    callAccount.value = draft ? draft.account || "" : "";
    callContact.value = draft ? draft.contact || "" : "";
    callPurpose.value = draft ? draft.purpose || "" : "";
    if (draft && draft.notes) {
      // Resume straight into the live view with prior notes intact.
      startLiveCall(domain, draft);
      return;
    }
    showScreen("screen-call-start");
    callAccount.focus();
  }

  document.getElementById("call-start-btn").addEventListener("click", () => {
    if (!callAccount.value.trim()) {
      callAccount.focus();
      return;
    }
    startLiveCall(currentDomain, {
      account: callAccount.value.trim(),
      contact: callContact.value.trim(),
      purpose: callPurpose.value.trim(),
      notes: [],
      startedAt: Date.now(),
    });
  });

  const liveAccountEl = document.getElementById("live-account");
  const liveInput = document.getElementById("live-input");
  const liveNotesEl = document.getElementById("live-notes");
  const markerRow = document.getElementById("marker-row");
  const liveSavedHint = document.getElementById("live-saved-hint");
  const liveTimerEl = document.getElementById("live-timer");

  function startLiveCall(domain, state) {
    currentDomain = domain;
    liveNotes = state.notes || [];
    liveStartedAt = state.startedAt || Date.now();
    activeMarker = null;

    liveAccountEl.textContent = `${state.account} — ${DOMAIN_LABEL[domain]}`;
    callAccount.value = state.account || "";
    callContact.value = state.contact || "";
    callPurpose.value = state.purpose || "";

    renderMarkers(domain);
    renderNotes();
    persistLiveDraft();
    showScreen("screen-call-live");
    liveInput.value = "";
    liveInput.focus();

    if (timerHandle) clearInterval(timerHandle);
    timerHandle = setInterval(updateTimer, 1000);
    updateTimer();
  }

  function updateTimer() {
    const elapsed = Math.floor((Date.now() - liveStartedAt) / 1000);
    const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
    const ss = String(elapsed % 60).padStart(2, "0");
    liveTimerEl.textContent = `${mm}:${ss}`;
  }

  function renderMarkers(domain) {
    markerRow.innerHTML = "";
    MARKERS[domain].forEach((marker) => {
      const btn = document.createElement("button");
      btn.className = "marker-btn";
      btn.textContent = marker;
      btn.type = "button";
      btn.addEventListener("click", () => {
        activeMarker = activeMarker === marker ? null : marker;
        markerRow.querySelectorAll(".marker-btn").forEach((b) => b.classList.remove("active"));
        if (activeMarker) btn.classList.add("active");
        liveInput.focus();
      });
      markerRow.appendChild(btn);
    });
  }

  function renderNotes() {
    liveNotesEl.innerHTML = "";
    liveNotes.forEach(({ marker, text }) => {
      const li = document.createElement("li");
      if (marker) {
        const tag = document.createElement("span");
        tag.className = "marker-tag";
        tag.textContent = `[${marker}]`;
        li.appendChild(tag);
      }
      li.appendChild(document.createTextNode(text));
      liveNotesEl.appendChild(li);
    });
    liveNotesEl.scrollTop = liveNotesEl.scrollHeight;
  }

  function persistLiveDraft() {
    if (!currentDomain) return;
    saveDraft(DOMAIN_MODE[currentDomain], {
      account: callAccount.value.trim(),
      contact: callContact.value.trim(),
      purpose: callPurpose.value.trim(),
      notes: liveNotes,
      startedAt: liveStartedAt,
    });
    liveSavedHint.textContent = "Draft saved locally";
  }

  liveInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const text = liveInput.value.trim();
    if (!text) return;
    liveNotes.push({ marker: activeMarker, text });
    activeMarker = null;
    markerRow.querySelectorAll(".marker-btn").forEach((b) => b.classList.remove("active"));
    liveInput.value = "";
    renderNotes();
    persistLiveDraft();
  });

  document.getElementById("live-end-btn").addEventListener("click", async () => {
    if (liveNotes.length === 0) {
      liveInput.focus();
      return;
    }
    const bodyLines = [];
    if (callPurpose.value.trim()) {
      bodyLines.push(`Purpose: ${callPurpose.value.trim()}`, "");
    }
    liveNotes.forEach(({ marker, text }) => {
      bodyLines.push(marker ? `- [${marker}] ${text}` : `- ${text}`);
    });

    const tags = [...new Set(liveNotes.filter((n) => n.marker).map((n) => n.marker))];

    const payload = {
      mode: DOMAIN_MODE[currentDomain],
      title: callAccount.value.trim(),
      account: callAccount.value.trim(),
      contact: callContact.value.trim(),
      tags,
      body: bodyLines.join("\n"),
    };

    const result = await capture(payload);
    if (result.ok) {
      clearDraft(DOMAIN_MODE[currentDomain]);
      if (timerHandle) clearInterval(timerHandle);
      const markerCount = liveNotes.filter((n) => n.marker).length;
      showSaved(
        `Call saved to Inbox\n${result.filename}\n${liveNotes.length} notes, ${markerCount} marked`
      );
    } else {
      liveSavedHint.textContent = `Save failed: ${result.message}`;
    }
  });

  // ---------- shared ----------

  async function capture(payload) {
    try {
      const res = await fetch("/api/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, message: data.message || "unknown error" };
      return { ok: true, filename: data.filename };
    } catch (err) {
      return { ok: false, message: "server unreachable — draft is still saved locally" };
    }
  }

  function showSaved(message) {
    document.getElementById("saved-message").textContent = message;
    showScreen("screen-saved");
  }

  // ---------- health check ----------

  async function checkHealth() {
    const pill = document.getElementById("status-pill");
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      if (data.vault_configured) {
        pill.textContent = "vault connected";
        pill.className = "status-pill ok";
      } else {
        pill.textContent = "vault not configured";
        pill.className = "status-pill error";
      }
    } catch {
      pill.textContent = "server unreachable";
      pill.className = "status-pill error";
    }
  }

  checkHealth();
  goHome();
})();
