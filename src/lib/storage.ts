import fs from 'fs';
import path from 'path';

export interface ChoiceRecord {
  choice: 'attempt-no' | 'yes';
  timestamp: string;
}

export interface UserSessionData {
  sessionId: string;
  attemptsCount: number;
  yesAcceptedAt?: string;
  choicesHistory: ChoiceRecord[];
  selectedFoods: string[];
  meetingDate?: string;
  meetingTime?: string;
  meetingLocation?: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory memory store + fallback persistence to JSON file
class ChoicePlanStore {
  private sessions: Map<string, UserSessionData> = new Map();
  private dbPath: string;

  constructor() {
    this.dbPath = path.join(process.cwd(), 'choice-plan-db.json');
    // Si existe la base antigua, migrarla limpiamente
    const legacyPath = path.join(process.cwd(), 'love-choice-db.json');
    if (!fs.existsSync(this.dbPath) && fs.existsSync(legacyPath)) {
      try {
        fs.copyFileSync(legacyPath, this.dbPath);
      } catch {}
    }
    this.loadFromDisk();
  }

  private loadFromDisk() {
    try {
      if (fs.existsSync(this.dbPath)) {
        const raw = fs.readFileSync(this.dbPath, 'utf-8');
        const data = JSON.parse(raw);
        if (Array.isArray(data)) {
          data.forEach((item: UserSessionData) => {
            this.sessions.set(item.sessionId, item);
          });
        }
      }
    } catch {
      // Ignore read errors gracefully
    }
  }

  private saveToDisk() {
    try {
      const data = Array.from(this.sessions.values());
      fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch {
      // Ignore write errors gracefully
    }
  }

  public getOrCreateSession(sessionId: string): UserSessionData {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        attemptsCount: 0,
        choicesHistory: [],
        selectedFoods: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.sessions.set(sessionId, session);
      this.saveToDisk();
    }
    return session;
  }

  public recordChoice(sessionId: string, choice: 'attempt-no' | 'yes'): UserSessionData {
    const session = this.getOrCreateSession(sessionId);
    const now = new Date().toISOString();

    if (choice === 'attempt-no') {
      session.attemptsCount += 1;
    } else if (choice === 'yes') {
      session.yesAcceptedAt = now;
    }

    session.choicesHistory.push({ choice, timestamp: now });
    session.updatedAt = now;
    this.saveToDisk();
    return session;
  }

  public recordFoods(sessionId: string, foods: string[]): UserSessionData {
    const session = this.getOrCreateSession(sessionId);
    session.selectedFoods = foods;
    session.updatedAt = new Date().toISOString();
    this.saveToDisk();
    return session;
  }

  public recordMeeting(
    sessionId: string,
    meeting: { date: string; time: string; location?: string }
  ): UserSessionData {
    const session = this.getOrCreateSession(sessionId);
    session.meetingDate = meeting.date;
    session.meetingTime = meeting.time;
    if (meeting.location) {
      session.meetingLocation = meeting.location;
    }
    session.updatedAt = new Date().toISOString();
    this.saveToDisk();
    return session;
  }

  public getAllSessions(): UserSessionData[] {
    return Array.from(this.sessions.values());
  }
}

// Global singleton for Next.js hot-reloading
const globalForStore = globalThis as unknown as { choicePlanStore?: ChoicePlanStore };
export const store = globalForStore.choicePlanStore ?? new ChoicePlanStore();
if (process.env.NODE_ENV !== 'production') {
  globalForStore.choicePlanStore = store;
}
