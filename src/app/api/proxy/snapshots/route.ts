import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imei = searchParams.get('imei');

  if (!imei) {
    return NextResponse.json(
      { error: 'IMEI parameter is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${API_BASE}/api/snapshots?imei=${imei}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching snapshots:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cycle snapshots' },
      { status: 500 }
    );
  }
}
