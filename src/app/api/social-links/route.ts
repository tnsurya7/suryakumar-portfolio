import { NextResponse } from 'next/server';
import portfolioData from '@/data/portfolio.json';

export async function GET() {
  try {
    return NextResponse.json(portfolioData.socialLinks);
  } catch (error) {
    return NextResponse.json([], { status: 200 });
  }
}
