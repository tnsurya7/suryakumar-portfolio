import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import SocialLink from '@/models/SocialLink';
import { authMiddleware } from '@/middleware/auth';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const data = await request.json();
    const link = await SocialLink.findByIdAndUpdate(params.id, data, { new: true });
    if (!link) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update social link' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await authMiddleware(request);
    if (auth instanceof NextResponse) return auth;

    await dbConnect();
    const link = await SocialLink.findByIdAndDelete(params.id);
    if (!link) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Social link deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete social link' }, { status: 500 });
  }
}
