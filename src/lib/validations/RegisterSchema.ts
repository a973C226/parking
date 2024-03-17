import * as z from "zod";


export const RegisterSchema = z.object({
    email: z.string().email({
      message: "Введите email.",
    }),
    password: z.string().min(6, {
      message: "Пароль должен содержать больше 6 символов.",
    }),
    username: z.string().min(1, {
      message: "Введите никнейм.",
    }),
    name: z.string().min(1, {
      message: "Введите имя.",
    }),
    lastname: z.string().min(1, {
        message: "Введите фамилию.",
    }),
    middlename: z.string().min(1, {
        message: "Введите отчество.",
    })
  });