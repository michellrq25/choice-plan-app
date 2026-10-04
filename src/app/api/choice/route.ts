import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';
import { notifyProposalAccepted } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, choice, name } = body;

    if (!sessionId || (choice !== 'attempt-no' && choice !== 'yes')) {
      return NextResponse.json(
        { error: 'Invalid parameters: sessionId and valid choice required' },
        { status: 400 }
      );
    }

    const session = store.recordChoice(sessionId, choice);

    if (choice === 'yes') {
      void notifyProposalAccepted(session.attemptsCount, name);
    }

    return NextResponse.json({
      success: true,
      attemptsCount: session.attemptsCount,
      yesAcceptedAt: session.yesAcceptedAt,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  const sessions = store.getAllSessions();
  return NextResponse.json({ sessions });
}
