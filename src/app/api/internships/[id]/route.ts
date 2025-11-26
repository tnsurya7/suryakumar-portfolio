import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Internship from '@/models/Internship';
import { authMiddleware } from '@/middleware/auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const data = await request.json();
    const internship = await Internship.findByIdAndUpdate(params.id, data, { new: true });
    if (!internship) {
      return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
    }
    return NextResponse.json(internship);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update internship' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const internship = await Internship.findByIdAndDelete(params.id);
    if (!internship) {
      return NextResponse.json({ error: 'Internship not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Internship deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete internship' }, { status: 500 });
  }
}
