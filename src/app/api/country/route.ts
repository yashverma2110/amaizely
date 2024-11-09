import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    return NextResponse.json({
      country: data.country_code,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch location' },
      { status: 500 }
    );
  }
}