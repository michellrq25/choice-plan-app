import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';
import { notifyFoodsConfirmed } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, foods, name } = body;

    if (!sessionId || !Array.isArray(foods) || foods.length === 0) {
      return NextResponse.json(
        { error: 'Invalid parameters: sessionId and non-empty foods array required' },
        { status: 400 }
      );
    }

    const session = store.recordFoods(sessionId, foods);

    await notifyFoodsConfirmed(session.selectedFoods, name).catch((err) =>
      console.error('[API Food] Telegram notification error:', err)
    );

    return NextResponse.json({
      success: true,
      selectedFoods: session.selectedFoods,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
