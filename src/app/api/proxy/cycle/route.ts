import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imei = searchParams.get('imei');
  const cycle = searchParams.get('cycle');

  if (!API_BASE) {
    console.error('NEXT_PUBLIC_API_BASE_URL environment variable is not set');
    return NextResponse.json(
      { error: 'API configuration error: NEXT_PUBLIC_API_BASE_URL is not set' },
      { status: 500 }
    );
  }

  if (!imei || !cycle) {
    return NextResponse.json(
      { error: 'IMEI and cycle parameters are required' },
      { status: 400 }
    );
  }

  try {
    const url = `${API_BASE}/api/snapshots/${imei}/cycles/${cycle}`;
    const response = await fetch(url, {
      next: { revalidate: 120 }, // Longer cache for specific cycle data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`API responded with status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching cycle data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to fetch cycle data',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
