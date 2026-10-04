/**
 * Telegram Notification Service for Choice Plan App
 * Sends real-time alerts when the user accepts or coordinates the date.
 */

import { UserSessionData } from '@/lib/storage';

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // No credentials configured yet; silently skip without throwing
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Telegram] Error response from API:', errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error('[Telegram] Failed to send notification:', error);
    return false;
  }
}

/**
 * Notifica cuando ella acepta la propuesta inicial
 */
export async function notifyProposalAccepted(attemptsCount: number, name?: string) {
  const targetName = name?.trim() || 'Alessandra';
  const attemptsMsg =
    attemptsCount === 0
      ? '¡Aceptó a la primera sin dudarlo! 💘'
      : `Intentó presionar "No" <b>${attemptsCount} veces</b> antes de aceptar 😂`;

  const message = [
    `🎉 <b>¡${targetName.toUpperCase()} DIJO QUE SÍ!</b> 💖`,
    '━━━━━━━━━━━━━━━━━',
    `✨ <b>Respuesta:</b> ¡Sí, acepto!`,
    `🏃 <b>Intentos de escape:</b> ${attemptsMsg}`,
    `🕒 <b>Hora:</b> ${new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`,
    '━━━━━━━━━━━━━━━━━',
    '<i>Ahora está eligiendo qué comer... 🍽️</i>',
  ].join('\n');

  return sendTelegramMessage(message);
}

/**
 * Notifica cuando ella confirma la selección de comidas
 */
export async function notifyFoodsConfirmed(foods: string[], name?: string) {
  const targetName = name?.trim() || 'Ale';
  const foodList = foods.map((f) => `  • ${f}`).join('\n');

  const message = [
    `🍽️ <b>ANTOJOS ELEGIDOS POR ${targetName.toUpperCase()}</b> 😋`,
    '━━━━━━━━━━━━━━━━━',
    foodList,
    '━━━━━━━━━━━━━━━━━',
    `📊 <b>Total de antojos:</b> ${foods.length}`,
    '<i>Siguiente paso: Coordinando fecha y hora... 🚗</i>',
  ].join('\n');

  return sendTelegramMessage(message);
}

/**
 * Notifica cuando la cita queda 100% coordinada
 */
export async function notifyMeetingCoordinated(session: UserSessionData, name?: string) {
  const targetName = name?.trim() || 'Ale';
  const foods = session.selectedFoods.length > 0 ? session.selectedFoods.join(', ') : 'No especificado';
  const location = session.meetingLocation || 'Por coordinar';

  const message = [
    `🚗 <b>¡CITA COORDINADA CON ${targetName.toUpperCase()}!</b> 🥂✨`,
    '━━━━━━━━━━━━━━━━━',
    `📅 <b>Fecha:</b> ${session.meetingDate || 'Por definir'}`,
    `🕒 <b>Hora:</b> ${session.meetingTime || 'Por definir'}`,
    `📍 <b>Punto de recojo:</b> ${location}`,
    `🍽️ <b>Para comer:</b> ${foods}`,
    `😂 <b>Intentos del botón No:</b> ${session.attemptsCount}`,
    '━━━━━━━━━━━━━━━━━',
    '🔥 <b>¡Todo listo! ¡A romperla en la cita! 😎</b>',
  ].join('\n');

  return sendTelegramMessage(message);
}
