# Cómo conectar tu formulario a una base de datos (Google Sheets) + aviso por correo

No necesitas saber programar. Esto toma unos 10 minutos y es gratis.

## Paso 1 — Crea la hoja de cálculo (tu base de datos)
1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja nueva.
2. Nómbrala, por ejemplo: **"Solicitudes EvoluciónBS"**.
3. Déjala vacía — el script creará las columnas automáticamente.

## Paso 2 — Pega el código del backend
1. Dentro de la hoja, ve a **Extensiones → Apps Script**.
2. Borra el código de ejemplo que aparece (`function myFunction() {}`).
3. Abre el archivo `apps-script-backend.gs` que te entregué y copia **todo** el contenido.
4. Pégalo en el editor de Apps Script.
5. Arriba, en la línea `const CORREO_DESTINO = "..."`, cambia el correo si quieres que los avisos lleguen a uno distinto.
6. Guarda (ícono de disco o `Ctrl+S`).

## Paso 3 — Publica el script como "Web App"
1. Arriba a la derecha, clic en **Implementar → Nueva implementación**.
2. En "Seleccionar tipo", elige **Aplicación web**.
3. Configura:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** Cualquier usuario
4. Clic en **Implementar**.
5. Google te pedirá autorizar permisos (es tu propio script, es seguro) — acepta.
6. Copia la **URL de la aplicación web** que te entrega, se ve así:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Paso 4 — Conecta esa URL al sitio web
1. Abre `index.html`.
2. Busca la línea:
   ```js
   const EVO_FORM_ENDPOINT = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";
   ```
3. Reemplaza el texto entre comillas por la URL que copiaste en el paso anterior.
4. Guarda el archivo y sube tu sitio (o pruébalo con Live Server).

## Paso 5 — Prueba
1. Llena el formulario en tu sitio y da clic en **Enviar**.
2. Deberías ver el mensaje de confirmación en la página.
3. Revisa tu Google Sheet — debe aparecer una fila nueva.
4. Revisa el correo configurado — debe llegar el aviso.

---

## Sobre WhatsApp (cuando decidas)

Dentro de `apps-script-backend.gs` dejé **dos opciones ya escritas y comentadas**, listas para activar cuando decidas cuál usar:

- **CallMeBot** — gratis, en minutos, pero solo envía a **un número personal** de WhatsApp y tiene límite de mensajes al día. Bueno para empezar mientras validas el flujo.
- **Twilio WhatsApp Business API** — número de negocio real, más profesional y escalable, pero requiere verificación de negocio y tiene costo por mensaje (unos centavos de dólar cada uno).

Cuando decidas, dime cuál y te ayudo a activarla — es literalmente descomentar unas líneas y poner tus credenciales.

## Nota sobre privacidad
Como ahora vas a guardar nombre, teléfono, correo y mensaje de tus clientes en un sistema propio, te recomiendo (como comenté al analizar la página original) agregar un **aviso de privacidad** breve en el sitio, indicando qué datos recopilas y para qué los usas. Si quieres, te ayudo a redactar uno corto y lo agregamos como enlace en el pie de página.
