import argparse
import socketserver
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler
from urllib.parse import urlparse


class Handler(SimpleHTTPRequestHandler):
    extensions_map = SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        ".mjs": "application/javascript",
    })

    def end_headers(self):
        path = urlparse(self.path).path
        if path.endswith("/examples/ARToolkitNFT_ES6_threading_example.html") or path.endswith("/examples/ARToolkitNFT_ES6_threading_example.html/"):
            self.send_header("Cross-Origin-Opener-Policy", "same-origin")
            self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default="_site")
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()

    root = Path(args.root).resolve()
    handler = partial(Handler, directory=str(root))

    with socketserver.TCPServer(("localhost", args.port), handler) as httpd:
        print(f"Serving {root} on http://localhost:{args.port}")
        httpd.serve_forever()


if __name__ == "__main__":
    main()
