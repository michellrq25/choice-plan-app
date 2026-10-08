import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';
import { notifyMeetingCoordinated } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, date, time, location, name, foods, attempts } = body;

    if (!sessionId || !date || !time) {
      return NextResponse.json(
        { error: 'Invalid parameters: sessionId, date, and time are required' },
        { status: 400 }
      );
    }

    const session = store.recordMeeting(sessionId, { date, time, location, foods, attempts });

    await notifyMeetingCoordinated(session, name).catch((err) =>
      console.error('[API Meeting] Telegram notification error:', err)
    );

    return NextResponse.json({
      success: true,
      meetingDate: session.meetingDate,
      meetingTime: session.meetingTime,
      meetingLocation: session.meetingLocation,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
