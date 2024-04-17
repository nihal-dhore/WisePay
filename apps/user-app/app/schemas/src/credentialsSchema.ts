import zod from "zod"
export const credentialsSchema = zod.object({
  phone: zod.string().trim().refine((value) => /^\+[1-9]\d{1,14}$/.test(value), {
    message: "Invalid phone number format. Please use international format, e.g., +123456789."
  }),
  password: zod.string().trim().min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    })
})
