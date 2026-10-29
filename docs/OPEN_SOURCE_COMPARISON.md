# Comparativa de Opciones Open Source y Solución Móvil PWA

Este documento detalla la investigación profunda sobre las opciones de código abierto (open source) existentes para llevar y registrar rutinas de hipertrofia en el teléfono móvil, evaluando sus ventajas, limitaciones y la solución implementada a medida en este repositorio.

---

## 1. Análisis de Opciones Open Source Existentes

### 1.1 [openGym](https://github.com/DuarteSantos8/openGym) (DuarteSantos8/openGym)
* **Licencia:** AGPL-3.0
* **Arquitectura:** Aplicación web local-first / PWA con backend opcional en Docker y apps nativas (APK para Android / TestFlight para iOS).
* **Puntos Fuertes:**
  * Interfaz moderna con visualización anatómica muscular.
  * Soporte para rotaciones de rutinas y descansos.
  * Importación desde Hevy, Strong y FitNotes.
* **Limitaciones para nuestra rutina:**
  * Para sincronización multi-dispositivo requiere auto-alojar un stack completo de Docker con base de datos PostgreSQL.
  * No tiene precargadas las reglas específicas de **Dynamic Double Progression (DDP)** (tope en Serie 1 como motor de sobrecarga y reducción del 5–10% ante caídas de fatiga).
  * No integra instrucciones de técnicas de elongación (rest-pause estructurado, lengthened partials, loaded stretches).

---

### 1.2 [wger Workout Manager](https://github.com/wger-project/wger) (wger-project/wger)
* **Licencia:** AGPL-3.0
* **Arquitectura:** Backend en Python/Django + aplicación móvil en Flutter (disponible en F-Droid, Play Store y App Store).
* **Puntos Fuertes:**
  * El proyecto open source más maduro y completo (entrenamiento, nutrición, medidas corporales).
  * Modo gimnasio ("Gym Mode") para guiar el entrenamiento en vivo.
* **Limitaciones para nuestra rutina:**
  * Muy pesado y complejo de desplegar (requiere servidor dedicado o contenedor Docker permanente).
  * La interfaz móvil para registrar series es lenta y requiere demasiados toques por serie, poco práctica con manos sudadas en el gimnasio.
  * No modela progresiones autoreguladas como DDP ni indicaciones biomecánicas por serie.

---

### 1.3 [Ballast](https://github.com/N-O-P-E/Ballast) (N-O-P-E/Ballast)
* **Licencia:** MIT / Open Source
* **Arquitectura:** PWA minimalista offline-first que utiliza almacenamiento local del navegador.
* **Puntos Fuertes:**
  * Privacidad total: sin cuentas, sin servidores, sin suscripciones.
  * Se instala directamente en iOS/Android como app nativa.
* **Limitaciones para nuestra rutina:**
  * Enfoque generalista (pensado principalmente para peso corporal, calistenia o levantamientos básicos).
  * Carece de timer de descanso contextual adaptado a cada ejercicio.
  * Sin motor de cálculo de saltos de sobrecarga (2.5%–5%) ni alertas de caída de volumen.

---

### 1.4 [mTOR / LiftLog](https://github.com/)
* **Puntos Fuertes:** Modelos experimentales orientados a sobrecarga progresiva y tracking de RIR.
* **Limitaciones:** La mayoría son herramientas web en etapas alfa o soluciones cerradas/freemium que no permiten personalización total del código.

---

## 2. La Solución Implementada: Hypertrophy DDP Mobile PWA

Al constatar que ninguna opción open source existente integraba nativamente:
1. El split exacto de **4 días (Upper A, Lower A, Upper B, Lower B)**.
2. El motor algorítmico de **Dynamic Double Progression (DDP)**.
3. Las alertas y guías de **técnicas de elongación** (*rest-pause*, parciales en estiramiento, pausas de 2s).
4. El guardado offline sin necesidad de configurar bases de datos ni Docker.

Se construyó una **Progressive Web App (PWA) nativa, de alto rendimiento y cero dependencias**, ubicada directamente en este directorio.

### Archivos de la Aplicación en tu Workspace:
* [`index.html`](file:///home/ivan/gym/index.html): Estructura semántica móvil, modales y panel de control.
* [`styles.css`](file:///home/ivan/gym/styles.css): Diseño dark-mode moderno optimizado para pantallas táctiles, targets de toque amplios ($\ge 44\text{px}$) y soporte de safe-areas (notch/home bar en iPhone).
* [`app.js`](file:///home/ivan/gym/app.js): Motor de lógica, evaluación DDP en tiempo real, timer con Web Audio API (campana sintetizada sin archivos externos), vibración háptica y persistencia en LocalStorage.
* [`manifest.json`](file:///home/ivan/gym/manifest.json) e [`icon.svg`](file:///home/ivan/gym/icon.svg): Manifiesto PWA para instalación como app independiente sin barra de navegación del navegador.
* [`sw.js`](file:///home/ivan/gym/sw.js): Service Worker para cachear todos los archivos y funcionar **100% offline** (modo avión o gimnasios sin cobertura).
* [`serve.py`](file:///home/ivan/gym/serve.py): Script de Python para servir la app en tu red local con 1 comando.

---

## 3. Funcionalidades Clave de la App Implementada

| Característica | Cómo Funciona en la App |
| :--- | :--- |
| **Motor DDP en Tiempo Real** | Al completar la **Serie 1**, si alcanzas el techo de reps (ej. 8 reps en un rango 6–8) con el RIR correcto, la app te felicita y calcula automáticamente el peso recomendado para la próxima semana (+2.5% a 5%). Si en Series 2 o 3 caes por debajo del piso (ej. < 6 reps), te sugiere reducir la carga entre 5% y 10%. |
| **Timer de Descanso Inteligente** | Al presionar el botón de completar serie ("✓"), el timer de descanso flotante inicia automáticamente con el tiempo exacto prescrito para ese ejercicio (3m para compuestos axiales, 2m para tracciones/empujes, 60–90s para aislamiento). Permite pausar, sumar/restar 30s o saltar. |
| **Alerta Sonora y Vibración** | Cuando el descanso llega a `00:00`, genera una campana armónica mediante el sintetizador del navegador (Web Audio API) y vibra el celular. |
| **Cues y Sustituciones de Máquinas** | Cada ejercicio cuenta con un desplegable con indicaciones biomecánicas y un modal de sustitutos oficiales en caso de que una máquina esté ocupada o tu gimnasio no la tenga. |
| **Modo Deload con 1 Toque** | Activa el interruptor de Deload en Ajustes para recortar el volumen un 50% y fijar el objetivo a 3–4 RIR de forma inmediata. |
| **Respaldo y Exportación** | Permite copiar la sesión terminada en formato tabla **Markdown** (para pegarla en tu [`workout_log.md`](file:///home/ivan/gym/workout_log.md)) o descargar un archivo JSON con todo tu historial acumulado. |

---

## 4. Cómo Usarla y Llevarla en tu Celular

### Opción A: A través de tu Red Wi-Fi Local (Sin instalar nada en la nube)
1. En esta computadora, ejecuta en la terminal:
   ```bash
   python3 serve.py
   ```
2. El script detectará la IP de tu red local y mostrará la dirección (por ejemplo: `http://192.168.1.50:8080`).
3. Conéctate con tu celular a la misma red Wi-Fi y abre esa dirección en **Safari** (iPhone) o **Chrome** (Android).
4. **Instalación en la pantalla de inicio:**
   * **En iPhone (Safari):** Toca el botón central de *Compartir* (cuadrado con flecha hacia arriba) y selecciona **"Agregar a pantalla de inicio"** (Add to Home Screen).
   * **En Android (Chrome):** Toca los tres puntos del menú superior y selecciona **"Instalar aplicación"** o **"Agregar a la pantalla principal"**.
5. ¡Listo! Ya tienes el icono de la aplicación en tu celular. Gracias al **Service Worker** (`sw.js`), la aplicación se almacena en el caché de tu teléfono y funcionará incluso si apagas la computadora o te quedas sin internet en el gimnasio.

---

### Opción B: Despliegue Permanente en la Nube (Gratis en 1 minuto)
Si prefieres tener una URL pública accesible desde cualquier red móvil 4G/5G (por ejemplo `https://mi-rutina.pages.dev`):

1. **GitHub Pages:**
   * Sube esta carpeta a un repositorio de GitHub.
   * Ve a *Settings* ➔ *Pages* ➔ Selecciona rama `main` y guarda.
   * En 30 segundos tendrás tu enlace HTTPS listo para abrir en cualquier teléfono.
2. **Netlify Drop o Vercel:**
   * Arrastra la carpeta `/home/ivan/gym` a [app.netlify.com/drop](https://app.netlify.com/drop) sin costo y obtén tu URL al instante.
