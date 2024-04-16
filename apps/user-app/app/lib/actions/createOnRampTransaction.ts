"use server";

import prisma from "@wise/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { randomUUID } from "crypto";

export async function createOnRampTransaction(provider: string, amount: number) {
  // Ideally the token should come from the banking provider (hdfc/axis)
  const session = await getServerSession(authOptions);
  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request"
    }
  }
  const token = randomUUID();
  await prisma.onRampTransaction.create({
    data: {
      provider,
      status: "Processing",
      startTime: new Date(),
      token: token,
      userId: (session?.user?.id),
      amount: amount
    }
  });

  return {
    message: "Done"
  }
}