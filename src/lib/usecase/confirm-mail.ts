"use server";

import { getVerificationTokenByToken } from "../repositories/verificiation-token";
import { getUserByEmail } from "../repositories/user";
import { db } from "../db";

export const confirmMail = async (token: string) => {

    const verificationToken = await getVerificationTokenByToken(token);
    if (!verificationToken) {
        return { error: "Токен не найден." };
    }

    const user = await getUserByEmail(verificationToken.email);
    if (!user) {
        return { error: "Пользователь не найден." };
    }

    await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
    })

    return { success: "Mail has been confirmed." }
}