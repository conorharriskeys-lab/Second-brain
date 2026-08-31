#!/usr/bin/env python3
"""Local capture server for the Second Brain Portal.

Serves the static capture UI and writes captured notes as Markdown
files directly into the vault's Inbox folder. Stdlib only — no
framework, no database, no auth. Saving to disk never depends on
any other service being reachable.
"""
import json
import os
import re
import unicodedata
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

STATIC_DIR = Path(__file__).parent / "static"


def load_env_file(path: Path) -> dict:
    values = {}
    if path.exists():
        for line in path.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            values[key.strip()] = value.strip().strip('"').strip("'")
    return values


ENV = {**load_env_file(Path(__file__).parent / ".env"), **os.environ}
VAULT_PATH = ENV.get("SECOND_BRAIN_VAULT_PATH")
PORT = int(ENV.get("SECOND_BRAIN_PORT", "8765"))

# mode -> knowledge-model.md "type"
MODES = {
    "quick-note": "note",
    "nable-call": "sales-call",
    "mortgage-call": "sales-call",
}


def slugify(text: str, fallback: str) -> str:
    text = unicodedata.normalize("NFKD", text or "").encode("ascii", "ignore").decode()
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text).strip("-").lower()
    return text or fallback


def inbox_dir() -> Path:
    if not VAULT_PATH:
        raise RuntimeError(
            "SECOND_BRAIN_VAULT_PATH is not set. Copy dashboard/.env.example to "
            "dashboard/.env and point it at your local vault folder."
        )
    inbox = Path(VAULT_PATH).expanduser() / "Inbox"
    inbox.mkdir(parents=True, exist_ok=True)
    return inbox


def yaml_string(value: str) -> str:
    return json.dumps(value or "")


def build_frontmatter(mode, note_type, created, account, contact, tags):
    tag_list = "[]" if not tags else "[" + ", ".join(yaml_string(t) for t in tags) + "]"
    lines = [
        "---",
        f"type: {note_type}",
        f"mode: {mode}",
        f"created: {created}",
        "status: inbox",
        f"account: {yaml_string(account)}",
        f"contact: {yaml_string(contact)}",
        f"tags: {tag_list}",
        "source: portal",
        "---",
        "",
    ]
    return "\n".join(lines)


class CaptureHandler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        pass  # keep the terminal quiet; note content should never hit logs

    def _send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/":
            self.path = "/index.html"
        if self.path == "/api/health":
            self._send_json(200, {"status": "ok", "vault_configured": bool(VAULT_PATH)})
            return
        self._serve_static()

    def _serve_static(self):
        rel = self.path.lstrip("/").split("?")[0]
        file_path = (STATIC_DIR / rel).resolve()
        if STATIC_DIR not in file_path.parents and file_path != STATIC_DIR:
            self.send_error(404)
            return
        if not file_path.exists() or not file_path.is_file():
            self.send_error(404)
            return
        content_type = {
            ".html": "text/html; charset=utf-8",
            ".js": "application/javascript",
            ".css": "text/css",
        }.get(file_path.suffix, "application/octet-stream")
        data = file_path.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self):
        if self.path != "/api/capture":
            self.send_error(404)
            return
        try:
            length = int(self.headers.get("Content-Length", 0))
            payload = json.loads(self.rfile.read(length) or b"{}")
            filename = self._write_capture(payload)
            self._send_json(200, {"status": "saved", "filename": filename})
        except RuntimeError as exc:
            self._send_json(500, {"status": "error", "message": str(exc)})
        except Exception as exc:
            self._send_json(400, {"status": "error", "message": f"bad request: {exc}"})

    def _write_capture(self, payload):
        mode = payload.get("mode")
        if mode not in MODES:
            raise ValueError(f"unknown mode: {mode}")
        body = (payload.get("body") or "").strip()
        if not body:
            raise ValueError("note body is empty")

        now = datetime.now()
        title = (payload.get("title") or payload.get("account") or "").strip()
        base = f"{now.strftime('%Y-%m-%d-%H%M')}-{mode}"
        slug = slugify(title, "")
        filename = f"{base}-{slug}.md" if slug else f"{base}.md"

        note_type = MODES[mode]
        frontmatter = build_frontmatter(
            mode=mode,
            note_type=note_type,
            created=now.isoformat(timespec="seconds"),
            account=payload.get("account", ""),
            contact=payload.get("contact", ""),
            tags=payload.get("tags", []),
        )

        heading = title or mode.replace("-", " ").title()
        content = frontmatter + f"# {heading}\n\n{body}\n"

        dest = inbox_dir() / filename
        # Never overwrite an existing capture.
        counter = 2
        while dest.exists():
            dest = dest.with_name(f"{dest.stem}-{counter}{dest.suffix}")
            counter += 1
        dest.write_text(content, encoding="utf-8")
        return dest.name


def main():
    if not VAULT_PATH:
        print("WARNING: SECOND_BRAIN_VAULT_PATH is not set.")
        print("Copy dashboard/.env.example to dashboard/.env and set it before capturing.")
    else:
        print(f"Vault Inbox: {Path(VAULT_PATH).expanduser() / 'Inbox'}")
    server = ThreadingHTTPServer(("127.0.0.1", PORT), CaptureHandler)
    print(f"Second Brain Portal running at http://127.0.0.1:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
