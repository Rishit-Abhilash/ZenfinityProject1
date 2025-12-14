import { NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

export async function GET() {
  if (!API_BASE) {
    console.error('NEXT_PUBLIC_API_BASE_URL environment variable is not set');
    return NextResponse.json(
      { error: 'API configuration error: NEXT_PUBLIC_API_BASE_URL is not set' },
      { status: 500 }
    );
  }

  try {
    const url = `${API_BASE}/api/snapshots/summary`;
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
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
    console.error('Error fetching summary:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        error: 'Failed to fetch battery summary',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
}
