import { NextResponse, NextRequest } from 'next/server';
import { register } from "@/lib/usecase/register";


export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const result = await register(body);

      if (!result.success) {
        return NextResponse.json({ status: 400, message: `Что-то пошло не так: ${result.error}` });
      }
  
      return NextResponse.json({ status: 200, message: "Пользователь успешно создан!"});
    } catch (error) {
      return NextResponse.json({ status: 400, message: `Что-то пошло не так: ${error}` });
    }
  }