# ✨ Choice Plan App — Mobile-First Date Invite

Una aplicación web interactiva, fresca y divertida pensada para invitar a salir a comer a alguien que estás recién conociendo (**cero presiones, cero cursilería forzada y mucho buen rollo**), optimizada específicamente para pantallas táctiles de teléfonos móviles (**iOS y Android**), construida con **Next.js (App Router)**, **TypeScript**, **Tailwind CSS** y **Framer Motion**.

---

## 📱 Características Mobile-First Implementadas

### 1. Botón "No 😅" (Evasión Táctil Infalible):
- **Cero retraso en celular:** Escucha eventos de bajo nivel `onTouchStart` y `onPointerDown` (además de `onMouseEnter` para pruebas en PC).
- **Cancelación inmediata:** Llama de inmediato a `e.preventDefault()` y `e.stopPropagation()` para suprimir por completo el evento sintetizado `click` de los navegadores móviles.
- **Cálculo geométrico en el viewport:** Restringe las nuevas coordenadas a `[safeMargin, window.innerWidth - buttonWidth - safeMargin]` y `[safeMargin, window.innerHeight - buttonHeight - safeMargin]` con un margen de seguridad de al menos 22px.
- **Prevención de colisión:** Se reposiciona asegurando que no quede oculto detrás del botón "Sí" ni fuera de pantalla.
- **Bloqueo de scroll:** Aplica `overflow-hidden` y `touch-action: none` en la pantalla de propuesta para que el usuario no arrastre la página al intentar tocarlo.
- **Telemetría en segundo plano:** Cada toque registra un `POST /api/choice` con `{ sessionId, choice: "attempt-no" }`.

### 2. Botón "Sí 💖" (Crecimiento Progresivo y Seguro):
- Escala progresiva: crece dinámicamente con cada intento fallido de presionar "No" (`1.0x` ➔ `1.14x` ➔ `1.28x` ➔ `1.42x` ... hasta un máximo seguro de `1.85x`), garantizando que no rompa el diseño vertical de smartphone ni tape otros elementos.
- Al tocarlo, transiciona fluidamente hacia la selección de comidas.

### 3. Paso 2: Selección de Comidas (Opciones Lima, Perú):
- Cuadrícula responsiva de 2 columnas (`grid-cols-2`) ergonómicamente ideal para el pulgar.
- Botones táctiles amplios con feedback háptico visual `active:scale-95`.
- Opciones gastronómicas top en Lima (12 opciones con scroll ergonómico y pastilla flotante animada):
  - **Makis** 🍣, **Parrillas** 🥩, **Pastas & Trattoria** 🍝, **Comida Marina** 🐟, **Chifa Fino** 🥢, **Pizza Artesanal** 🍕, **Hamburguesas Gourmet** 🍔, **Pollo a la Brasa Top** 🍗, **Rooftop & Cócteles** 🍸, **Tapas & Vinitos** 🍷, **Brunch Aesthetic** 🥞, **Café & Postre** 🍨.

### 4. Paso 3: Coordinación de Fecha y Hora (Mobile First):
- **Selector táctil de día:** Chips directos para *Viernes*, *Sábado*, *Domingo* u opción para seleccionar fecha personalizada.
- **Selector táctil de horario:** Opciones populares (*1:30 PM*, *4:00 PM*, *7:30 PM*, *8:30 PM*, *9:00 PM*) u horario personalizado.
- **Lugar de recogida:** Campo opcional para que indique dónde pasar a recogerla (*Casa, Miraflores, San Isidro...*).

### 5. Paso 4: Pantalla Final y Confirmación por Telegram:
- Ráfaga de confeti festivo.
- Resumen completo: Día, Hora, Lugar de recogida, Antojos elegidos y contador de escapes.
- **Botón / Confirmación por Telegram:** Genera y comparte automáticamente el mensaje completo listo para enviar:
  `"¡Quedó listo el plan! 😎 Pasas por mí el Sábado a las 8:30 PM, y vamos a comer Makis, Comida Marina... ¡Nos vemos! ✨"`

### 6. Backend & Endpoints:
- `POST /api/choice`: Registra intentos de evasión (`attempt-no` o `yes`).
- `POST /api/food`: Guarda los platillos seleccionados.
- `POST /api/meeting`: Guarda la fecha, hora y punto de encuentro.
- `GET /api/choice`: Audita las sesiones almacenadas.

---

## 🚀 Comandos de Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
npm start
```
