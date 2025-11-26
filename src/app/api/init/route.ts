import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    await dbConnect();

    const existingUser = await User.findOne({ email: 'surya@admin.com' });
    if (existingUser) {
      return NextResponse.json({ message: 'Admin already exists' });
    }

    const hashedPassword = await hashPassword('admin123');
    await User.create({
      email: 'surya@admin.com',
      password: hashedPassword,
      name: 'Surya Kumar M',
      role: 'admin',
    });

    return NextResponse.json({ message: 'Admin user created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Initialization failed' }, { status: 500 });
  }
}
