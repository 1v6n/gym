# Comparativa de Herramientas Open Source

Evaluación de aplicaciones de código abierto para registrar entrenamientos con Dynamic Double Progression (DDP) frente a una PWA dedicada.

---

## 1. Opciones Open Source Existentes

### 1.1 [openGym](https://github.com/DuarteSantos8/openGym)
* **Licencia:** AGPL-3.0
* **Arquitectura:** Web local-first / PWA con backend opcional en Docker y APK Android / TestFlight iOS.
* **Ventajas:**
  * Visualización anatómica por grupo muscular.
  * Importación desde Hevy, Strong y FitNotes.
* **Limitaciones:**
  * Sincronizar entre dispositivos requiere levantar un contenedor Docker con PostgreSQL.
  * No modela reglas de DDP (tope en serie 1 ni reducción del 5–10% ante caídas de fatiga).
  * Sin instrucciones de ejecución ni técnicas de estiramiento en la interfaz de registro.

---

### 1.2 [wger Workout Manager](https://github.com/wger-project/wger)
* **Licencia:** AGPL-3.0
* **Arquitectura:** Backend en Python/Django + app móvil en Flutter.
* **Ventajas:**
  * Proyecto maduro que abarca entrenamiento, nutrición y medidas.
  * Modo de registro en vivo.
* **Limitaciones:**
  * Requiere servidor dedicado o contenedor Docker permanente.
  * El flujo de registro de series exige demasiados toques de pantalla entre ejercicios.
  * No admite lógica de sobrecarga autorregulada por serie.

---

### 1.3 [Ballast](https://github.com/N-O-P-E/Ballast)
* **Licencia:** MIT
* **Arquitectura:** PWA minimalista sin backend con almacenamiento en navegador.
* **Ventajas:**
  * Sin cuentas, servidores ni suscripciones.
  * Instalación directa en iOS y Android.
* **Limitaciones:**
  * Diseñado para calistenia y levantamiento básico.
  * Sin temporizador contextual por ejercicio.
  * Sin cálculo de incrementos porcentuales ni detección de fatiga.

---

## 2. Por qué una PWA a Medida

Las herramientas existentes obligan a elegir entre dos extremos: apps completas que exigen un servidor Docker con base de datos, o utilidades minimalistas que no calculan progresiones.

Esta PWA combina ambos enfoques:
- **Cálculo de DDP en tiempo real**: felicita y recomienda subir entre 2.5% y 5% de carga si la serie 1 alcanza el techo de repeticiones; recomienda bajar entre 5% y 10% si una serie cae por debajo del piso.
- **Temporizador adaptativo**: carga los descansos prescritos (2 a 3.5 min en compuestos; 60 a 90s en aislamiento) con avisos de audio y vibración sin dependencias externas.
- **Sin backend**: los datos viven en el `localStorage` del navegador. Se instala desde la pantalla de inicio y funciona sin conexión mediante Service Worker.

---

## 3. Estructura de Archivos

* [`index.html`](file:///home/ivan/gym/index.html): Estructura semántica, modales y controles.
* [`assets/css/styles.css`](file:///home/ivan/gym/assets/css/styles.css): Diseño con tokens Dusk, botones con target táctil mínimo de 44px y márgenes para el notch de iOS.
* [`assets/js/app.js`](file:///home/ivan/gym/assets/js/app.js): Motor de progresión DDP, temporizador con Web Audio API y persistencia local.
* [`manifest.json`](file:///home/ivan/gym/manifest.json) y [`assets/icons/icon.svg`](file:///home/ivan/gym/assets/icons/icon.svg): Configuración PWA para ejecución en pantalla completa.
* [`sw.js`](file:///home/ivan/gym/sw.js): Service Worker para cachear assets y operar sin internet.
* [`scripts/serve.py`](file:///home/ivan/gym/scripts/serve.py): Servidor local para pruebas en red Wi-Fi.

---

## 4. Despliegue en el Teléfono

### Opción A: Wi-Fi Local (Sin Nube)
1. Ejecuta en la terminal:
   ```bash
   python3 scripts/serve.py
   ```
2. Abre en tu teléfono la dirección IP indicada (por ejemplo `http://192.168.1.50:8080`).
3. En Safari (iOS), pulsa **Compartir** -> **Agregar a pantalla de inicio**. En Chrome (Android), pulsa el menú de tres puntos -> **Instalar aplicación**.

### Opción B: Cloudflare Pages o GitHub Pages
1. Sube el repositorio a GitHub.
2. En GitHub Pages o Cloudflare Pages, selecciona la rama `main` y la carpeta raíz `/`.
3. Abre el enlace HTTPS en el teléfono e instala la app en la pantalla de inicio.
