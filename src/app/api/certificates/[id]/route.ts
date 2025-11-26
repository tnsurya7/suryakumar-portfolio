import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Certificate from '@/models/Certificate';
import { authMiddleware } from '@/middleware/auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const data = await request.json();
    const certificate = await Certificate.findByIdAndUpdate(params.id, data, { new: true });
    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }
    return NextResponse.json(certificate);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update certificate' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const certificate = await Certificate.findByIdAndDelete(params.id);
    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Certificate deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete certificate' }, { status: 500 });
  }
}
