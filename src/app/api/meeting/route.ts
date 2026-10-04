import { NextResponse } from 'next/server';
import { store } from '@/lib/storage';
import { notifyMeetingCoordinated } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, date, time, location, name } = body;

    if (!sessionId || !date || !time) {
      return NextResponse.json(
        { error: 'Invalid parameters: sessionId, date, and time are required' },
        { status: 400 }
      );
    }

    const session = store.recordMeeting(sessionId, { date, time, location });

    void notifyMeetingCoordinated(session, name);

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
