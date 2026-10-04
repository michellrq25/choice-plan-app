import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      {
        configured: false,
        error: 'Variables TELEGRAM_BOT_TOKEN y/o TELEGRAM_CHAT_ID no configuradas en .env.local',
      },
      { status: 400 }
    );
  }

  const testMessage = [
    '🔔 <b>¡Conexión Exitosa con Telegram!</b> 🚀',
    '━━━━━━━━━━━━━━━━━',
    'Las notificaciones de tu Choice Plan App están funcionando perfectamente.',
    'Recibirás alertas aquí cuando ella acepte la cita y coordine los detalles.',
  ].join('\n');

  const sent = await sendTelegramMessage(testMessage);

  if (sent) {
    return NextResponse.json({
      configured: true,
      success: true,
      message: 'Mensaje de prueba enviado exitosamente a tu Telegram.',
    });
  } else {
    return NextResponse.json(
      {
        configured: true,
        success: false,
        error: 'No se pudo enviar el mensaje. Revisa que el BOT_TOKEN y CHAT_ID sean válidos y que hayas presionado /start en tu bot.',
      },
      { status: 500 }
    );
  }
}
