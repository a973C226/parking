import { NextResponse, NextRequest } from "next/server";
import { confirmMail } from "@/lib/usecase/confirm-mail";


export async function GET(request: NextRequest) {
    try {
      const token = request.nextUrl.searchParams.get("token");
      if (!token) {
        return NextResponse.json({"status": 500, "message": "Не передан токен подтверждения."});
      }
      const result = await confirmMail(token);

      if (!result.success) {
        return NextResponse.json({ status: 400, message: `Что-то пошло не так: ${result.error}`});
      }
      return NextResponse.json({ status: 200, message: "Почта успешно подтверждена."});
    } catch (error) {
      return NextResponse.json({ status: 400, message: `Что-то пошло не так: ${error}` });
    }
  }