import { NextResponse } from 'next/server';
import { DealsFetchReturnType, fetchDealsStatic } from '@/utils';
 
export async function GET() {
  try {
    const dealsData: DealsFetchReturnType = await fetchDealsStatic();

    if (dealsData.error) {
      return NextResponse.json(dealsData, { status: 500 });
    }

    return NextResponse.json(dealsData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
