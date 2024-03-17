"use server";

import bcrypt from "bcrypt";
import * as z from "zod";
import { RegisterSchema } from "@/lib/validations/RegisterSchema"
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/repositories/user";

import { sendVerificationEmail } from "@/lib/email";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error };
  }

  const email = validatedFields.data.email;

  const password = validatedFields.data.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const user = await db.user.create({
    data: {
      ...validatedFields.data,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );

  return { success: user };
};