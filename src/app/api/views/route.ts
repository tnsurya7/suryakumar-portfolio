import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// In-memory storage (for demo - use database in production)
let viewCount = 0;
const viewedIPs = new Set<string>();

export async function GET() {
  try {
    return NextResponse.json({ views: viewCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get views' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown';

    // Only count unique visitors
    if (!viewedIPs.has(ip)) {
      viewCount++;
      viewedIPs.add(ip);
    }

    return NextResponse.json({ views: viewCount });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
}
