import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imei = searchParams.get('imei');
  const cycle = searchParams.get('cycle');

  if (!imei || !cycle) {
    return NextResponse.json(
      { error: 'IMEI and cycle parameters are required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${API_BASE}/api/snapshots/${imei}/cycles/${cycle}`,
      {
        next: { revalidate: 120 }, // Longer cache for specific cycle data
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching cycle data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cycle data' },
      { status: 500 }
    );
  }
}
