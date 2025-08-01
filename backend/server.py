#!/usr/bin/env python3
"""
Toilet Saver HTTPS Development Server

A simple HTTPS server for local development that supports:
- Geolocation API (requires HTTPS)
- CORS headers for API access
- Auto-generated self-signed certificates
- Dynamic path detection
"""

import http.server
import ssl
import socketserver
import os
import sys
import subprocess
from pathlib import Path

# Configuration
DEFAULT_PORT = 8443
CERT_FILE = 'server.crt'
KEY_FILE = 'server.key'

class ToiletSaverHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP handler with CORS support for API requests."""
    
    def end_headers(self):
        """Add CORS headers to all responses."""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Custom log format with timestamp."""
        import datetime
        timestamp = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

def check_openssl():
    """Check if OpenSSL is available for certificate generation."""
    try:
        subprocess.run(['openssl', 'version'], 
                      stdout=subprocess.DEVNULL, 
                      stderr=subprocess.DEVNULL, 
                      check=True)
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def generate_certificate():
    """Generate self-signed certificate for HTTPS."""
    if not check_openssl():
        print("❌ Error: OpenSSL not found. Please install OpenSSL to generate SSL certificates.")
        print("   macOS: brew install openssl")
        print("   Ubuntu/Debian: sudo apt-get install openssl")
        print("   Windows: Download from https://slproweb.com/products/Win32OpenSSL.html")
        return False
    
    print("🔐 Creating self-signed certificate...")
    cmd = [
        'openssl', 'req', '-x509', '-newkey', 'rsa:4096',
        '-keyout', KEY_FILE, '-out', CERT_FILE,
        '-days', '365', '-nodes',
        '-subj', '/C=TW/ST=Taiwan/L=Taipei/O=ToiletSaver/CN=localhost'
    ]
    
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        print("✅ Certificate created successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to create certificate: {e}")
        return False

def get_current_directory():
    """Get the current working directory where the script is located."""
    if getattr(sys, 'frozen', False):
        # If running as a compiled executable
        return Path(sys.executable).parent
    else:
        # If running as a script
        return Path(__file__).parent.absolute()

def start_server(port=DEFAULT_PORT):
    """Start the HTTPS development server."""
    # Change to the script's directory
    script_dir = get_current_directory()
    os.chdir(script_dir)
    
    print(f"🚽 Toilet Saver HTTPS Development Server")
    print(f"📁 Serving from: {script_dir}")
    print(f"🌐 Port: {port}")
    print("-" * 50)
    
    # Check if main files exist
    required_files = ['index.html', 'styles.css', 'script.js']
    missing_files = [f for f in required_files if not Path(f).exists()]
    
    if missing_files:
        print(f"⚠️  Warning: Missing files: {', '.join(missing_files)}")
        print("   Make sure you're running this script from the project directory.")
    
    # Setup SSL context
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    
    # Try to load existing certificates or generate new ones
    try:
        context.load_cert_chain(CERT_FILE, KEY_FILE)
        print("🔐 Using existing SSL certificate")
    except FileNotFoundError:
        print("🔐 SSL certificate not found, generating new one...")
        if not generate_certificate():
            print("❌ Failed to generate SSL certificate. Exiting.")
            return False
        
        try:
            context.load_cert_chain(CERT_FILE, KEY_FILE)
        except Exception as e:
            print(f"❌ Failed to load certificate: {e}")
            return False
    
    # Start the server
    try:
        with socketserver.TCPServer(("", port), ToiletSaverHTTPRequestHandler) as httpd:
            httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
            
            print(f"✅ Server started successfully!")
            print(f"🔗 Open: https://localhost:{port}")
            print(f"📱 Or try: https://127.0.0.1:{port}")
            print("")
            print("📝 Note: Your browser will show a security warning for the self-signed certificate.")
            print("   Click 'Advanced' and 'Proceed to localhost' to continue.")
            print("")
            print("⏹️  Press Ctrl+C to stop the server")
            print("-" * 50)
            
            httpd.serve_forever()
            
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {port} is already in use. Try a different port:")
            print(f"   python3 server.py {port + 1}")
        else:
            print(f"❌ Failed to start server: {e}")
        return False
    except KeyboardInterrupt:
        print(f"\n👋 Server stopped by user")
        return True

def main():
    """Main entry point."""
    # Parse command line arguments
    port = DEFAULT_PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
            if not (1024 <= port <= 65535):
                print("❌ Port must be between 1024 and 65535")
                return
        except ValueError:
            print("❌ Invalid port number")
            return
    
    start_server(port)

if __name__ == "__main__":
    main()