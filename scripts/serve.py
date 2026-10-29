#!/usr/bin/env python3
"""
Servidor local para Hypertrophy DDP PWA.
Permite abrir la aplicación en tu celular a través de la misma red Wi-Fi o localhost.
"""

import http.server
import socket
import socketserver
import os
import sys

PORT = 8080

def get_ip_addresses():
    ips = []
    try:
        # Standard socket test
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.5)
        s.connect(('8.8.8.8', 80))
        main_ip = s.getsockname()[0]
        s.close()
        ips.append(main_ip)
    except Exception:
        pass

    try:
        hostname = socket.gethostname()
        for ip in socket.gethostbyname_ex(hostname)[2]:
            if ip not in ips and not ip.startswith('127.'):
                ips.append(ip)
    except Exception:
        pass

    return ips

def main():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(project_root)

    port = PORT
    if len(sys.argv) > 1 and sys.argv[1].isdigit():
        port = int(sys.argv[1])
    elif "PORT" in os.environ and os.environ["PORT"].isdigit():
        port = int(os.environ["PORT"])

    handler = http.server.SimpleHTTPRequestHandler
    handler.extensions_map.update({
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.js': 'application/javascript',
        '.css': 'text/css'
    })

    socketserver.TCPServer.allow_reuse_address = True
    try:
        httpd = socketserver.TCPServer(("", port), handler)
    except OSError as e:
        if e.errno == 98:
            print(f"\n❌ Error: El puerto {port} ya está en uso por otro proceso.")
            print(f"👉 Puedes liberar el puerto ejecutando:")
            print(f"   fuser -k {port}/tcp   o   kill $(lsof -t -i:{port})")
            print(f"👉 O iniciar el servidor en otro puerto:")
            print(f"   python scripts/serve.py {port + 1}\n")
            sys.exit(1)
        raise

    ips = get_ip_addresses()

    print("=" * 64)
    print(" 🏋️  HYPERTROPHY DDP - SERVIDOR LOCAL PARA MÓVIL (PWA)")
    print("=" * 64)
    print(f"\n✅ Servidor iniciado en el puerto {port}.")
    print("\n📱 CÓMO ABRIRLO EN TU CELULAR:")
    print(" 1. Asegúrate de que tu celular y esta PC estén en la misma red Wi-Fi.")
    print(" 2. Abre Safari (iOS) o Chrome (Android) en tu teléfono.")
    print(" 3. Entra a una de las siguientes direcciones:\n")

    for ip in ips:
        print(f"    👉 http://{ip}:{port}")

    print(f"    👉 http://localhost:{port} (en esta computadora)")
    print("\n📲 CÓMO GUARDARLO COMO APP NATIVA:")
    print(" • En iPhone (Safari): Toca el botón 'Compartir' ➔ 'Agregar a pantalla de inicio'.")
    print(" • En Android (Chrome): Toca los 3 puntos ➔ 'Instalar aplicación' o 'Agregar a la pantalla principal'.")
    print(" • Funcionará 100% offline (sin internet) en el gimnasio gracias al Service Worker!")
    print("\nPresiona Ctrl+C para detener el servidor.\n" + "=" * 64 + "\n")

    try:
        with httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
        sys.exit(0)

if __name__ == '__main__':
    main()
