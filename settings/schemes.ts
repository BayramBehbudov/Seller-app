import { z } from "zod";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const RegisterSchema = z.object({
  email: z
    .string({
      required_error: "E-poçt daxil edin",
    })
    .email("Düzgün e-poçt ünvanı daxil edin. məs. numune@numune.com"),
  password: z
    .string({
      required_error: "Şifrəni daxil edin",
    })
    .trim()
    .min(8, { message: "Şifrə minimum 8 simvoldan ibarət olmalıdır" })
    .regex(/[A-Z]/, { message: "Şifrədə ən az bir böyük hərf olmalıdır" })
    .regex(/[a-z]/, { message: "Şifrədə ən az bir kiçik hərf olmalıdır" })
    .regex(/[0-9]/, { message: "Şifrədə ən az bir rəqəm olmalıdır" }),
  name: z
    .string({
      required_error: "Adınızı daxil edin",
    })
    .trim()
    .min(2, {
      message: "Adınızı daxil edin",
    }),

  surname: z
    .string({
      required_error: "Soyadınızı daxil edin",
    })
    .trim()
    .min(2, {
      message: "Soyadınızı daxil edin",
    }),

  phone: z
    .string({
      required_error: "Nömrəni daxil edin",
    })
    .trim()
    .regex(/^\+994\d{9}$/, {
      message: "Nömrəni düzgün daxil edin. məs. +994501234567",
    }),
  gender: z.enum(["male", "female"], {
    required_error: "Cinsinizi daxil edin",
  }),
});

export const LoginSchema = z.object({
  password: z
    .string({
      required_error: "Şifrəni daxil edin",
    })
    .trim()
    .min(8, { message: "Şifrə minimum 8 simvoldan ibarət olmalıdır" })
    .regex(/[A-Z]/, { message: "Şifrədə ən az bir böyük hərf olmalıdır" })
    .regex(/[a-z]/, { message: "Şifrədə ən az bir kiçik hərf olmalıdır" })
    .regex(/[0-9]/, { message: "Şifrədə ən az bir rəqəm olmalıdır" }),
  email: z
    .string({
      required_error: "E-poçt daxil edin",
    })
    .email("Düzgün e-poçt ünvanı daxil edin. məs. numune@numune.com")
    .trim(),
});

export const AddProductSchema = z.object({
  name: z
    .string({
      required_error: "Məhsulun adını daxil edin",
    })
    .min(5, {
      message: "Məhsulun adını daxil edin",
    })
    .trim(),
  store: z
    .string({
      required_error: "Mağazanızı seçin",
    })
    .min(5, {
      message: "Mağaza seçilməlidir",
    })
    .trim(),
  description: z
    .string({
      required_error: "Məhsul haqqında açıqlama daxil edin",
    })
    .min(5, {
      message: "Məhsul haqqında açıqlama daxil edin",
    })
    .trim(),
  price: z
    .string({ message: "Qiyməti düzgün daxil edin" })
    .regex(/^\d+(\.\d{1,2})?$/)
    .trim(),
  category: z.object({
    main: z
      .string({
        required_error: "Kateqoriyanı daxil edin",
      })
      .trim(),
    sub: z
      .string({
        required_error: "Kateqoriyanı daxil edin",
      })
      .trim(),
    child: z
      .string({
        required_error: "Kateqoriyanı daxil edin",
      })
      .trim(),
  }),
});

export const StoreSchema = z.object({
  name: z
    .string({
      required_error: "Mağazanızın adını daxil edin",
    })
    .trim()
    .min(2, {
      message: "Mağazanızın adını daxil edin",
    }),

  address: z
    .string({
      required_error: "Mağazanızın ünvanını daxil edin",
    })
    .trim()
    .min(2, {
      message: "Mağazanızın ünvanını daxil edin",
    }),

  phone: z
    .string({
      required_error: "Mağazanızın mobil nömrəsini daxil edin",
    })
    .trim()
    .regex(/^\+994\d{9}$/, {
      message: "Nömrəni düzgün daxil edin. məs. +994501234567",
    }),
  description: z
    .string({
      required_error: "Mağaza haqqında açıqlama daxil edin",
    })
    .min(5, {
      message: "Mağaza haqqında açıqlama daxil edin",
    })
    .trim(),
  point: z
    .string({
      required_error: "Təyinat nöqtəsi seçin",
    })
    .length(24),
});
