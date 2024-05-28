import FastSpeedtest from 'fast-speedtest-api';
import { NextResponse, NextRequest } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  const fastSpeedTestToken = process.env
    .NEXT_PUBLIC_FAST_SPEED_TEST_TOKEN as string;
  try {
    let speedtest = new FastSpeedtest({
      token: fastSpeedTestToken ?? '',
      verbose: false,
      timeout: 10000,
      https: true,
      urlCount: 5,
      bufferSize: 8,
      unit: FastSpeedtest.UNITS.MBps,
    });

    const resp = await speedtest.getSpeed();
    return NextResponse.json({ data: resp }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
