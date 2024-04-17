"use server"
import { credentialsSchema } from "../../schemas/src/credentialsSchema";

export type FormState = {
  message: string;
}

export async function onSubmitAction(
  prevState: FormState,
  data: FormData): Promise<FormState> {
  "use server"

  const formData = Object.fromEntries(data);
  const parsed = credentialsSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: parsed.error.issues[0]?.message || "Invalid inputs"
    }
  }

  return {
    message: "User Registered"
  }
}