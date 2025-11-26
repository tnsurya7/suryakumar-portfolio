import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Education from '@/models/Education';
import { authMiddleware } from '@/middleware/auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const data = await request.json();
    const education = await Education.findByIdAndUpdate(params.id, data, { new: true });
    if (!education) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const education = await Education.findByIdAndDelete(params.id);
    if (!education) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Education deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 });
  }
}
