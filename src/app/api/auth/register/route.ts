import { NextResponse } from 'next/server';
import { register } from "@/lib/usecase/register";


export async function POST(request: Request) {
    try {
      const body = await request.json();
      const result = await register(body);

      if (!result.success) {
        return NextResponse.json({ status: 400, message: `Something went wrong: ${result.error}` });
      }
  
      return NextResponse.json({ status: 200, message: "User is created successfully!"});
    } catch (error) {
      return NextResponse.json({ status: 400, message: `Something went wrong: ${error}` });
    }
  }