/**
 * BACKEND DE SOLICITUDES — Consultoría Financiera EvoluciónBS
 * ------------------------------------------------------------
 * Este script recibe los datos del formulario del sitio web,
 * los guarda como una fila nueva en Google Sheets (tu base de
 * datos) y envía un correo de aviso automático.
 *
 * NO necesitas saber programar para usarlo: solo sigue los
 * pasos de "instrucciones-backend.md".
 */

// 👉 Cambia esto por el correo donde quieres recibir los avisos.
const CORREO_DESTINO = "consultoevolucion@gmail.com";

// 👉 Nombre de la hoja dentro del Google Sheet donde se guardan los registros.
const NOMBRE_HOJA = "Solicitudes";

function doPost(e) {
  try {
    const datos = JSON.parse(e.postData.contents);

    guardarEnHoja(datos);
    enviarCorreoAviso(datos);

    // Si más adelante activas WhatsApp, la llamada iría aquí:
    // enviarWhatsApp(datos);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function guardarEnHoja(datos) {
  const hoja = obtenerOCrearHoja();
  hoja.appendRow([
    new Date(),
    datos.nombre || "",
    datos.telefono || "",
    datos.correo || "",
    datos.mensaje || "",
    "Nuevo" // columna de estado, para que marques cuando ya diste seguimiento
  ]);
}

function obtenerOCrearHoja() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(NOMBRE_HOJA);

  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA);
    hoja.appendRow(["Fecha", "Nombre", "Teléfono", "Correo", "Mensaje", "Estado"]);
    hoja.setFrozenRows(1);
  }
  return hoja;
}

function enviarCorreoAviso(datos) {
  const asunto = "Nueva solicitud desde el sitio web — EvoluciónBS";
  const cuerpo =
    "Ha llegado una nueva solicitud de un posible cliente:\n\n" +
    "Nombre: " + (datos.nombre || "-") + "\n" +
    "Teléfono: " + (datos.telefono || "-") + "\n" +
    "Correo: " + (datos.correo || "-") + "\n" +
    "Mensaje: " + (datos.mensaje || "-") + "\n\n" +
    "Este registro ya quedó guardado en tu Google Sheet.";

  MailApp.sendEmail(CORREO_DESTINO, asunto, cuerpo);
}

/**
 * WHATSAPP (aún no activo)
 * -------------------------
 * Cuando decidas qué opción usar, descomenta y completa una
 * de las dos funciones de ejemplo de abajo, y descomenta la
 * línea "enviarWhatsApp(datos);" en doPost().
 */

// Opción A: CallMeBot (gratis, a tu número personal de WhatsApp)
// function enviarWhatsApp(datos) {
//   const telefono = "521XXXXXXXXXX"; // tu número con código de país, sin "+"
//   const apiKey = "TU_API_KEY_DE_CALLMEBOT";
//   const mensaje = encodeURIComponent(
//     "Nueva solicitud: " + datos.nombre + " - " + datos.telefono
//   );
//   const url = "https://api.callmebot.com/whatsapp.php?phone=" + telefono +
//               "&text=" + mensaje + "&apikey=" + apiKey;
//   UrlFetchApp.fetch(url);
// }

// Opción B: Twilio WhatsApp Business API (de pago, número de negocio)
// function enviarWhatsApp(datos) {
//   const sid = "TU_ACCOUNT_SID";
//   const token = "TU_AUTH_TOKEN";
//   const url = "https://api.twilio.com/2010-04-01/Accounts/" + sid + "/Messages.json";
//   const payload = {
//     From: "whatsapp:+14155238886", // número de sandbox o tu número de Twilio
//     To: "whatsapp:+521XXXXXXXXXX",
//     Body: "Nueva solicitud: " + datos.nombre + " - " + datos.telefono
//   };
//   const options = {
//     method: "post",
//     payload: payload,
//     headers: {
//       Authorization: "Basic " + Utilities.base64Encode(sid + ":" + token)
//     }
//   };
//   UrlFetchApp.fetch(url, options);
// }
