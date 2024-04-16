"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@wise/db/client";

export async function ptoPTransfer(receiverPhone: string, amount: number) {
  const session = await getServerSession(authOptions);
  const sender = session?.user?.id;
  if (!sender) {
    return {
      message: "Error while sending"
    }
  }
  const receiverUser = await prisma.user.findFirst({
    where: {
      number: receiverPhone
    }
  });

  if (!receiverUser) {
    return {
      message: "User not found"
    }
  }
  await prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${sender} FOR UPDATE`;

    const senderBalance = await tx.balance.findUnique({
      where: { userId: sender },
    });
    if (!senderBalance || senderBalance.amount < amount) {
      throw new Error('Insufficient funds');
    }

    await tx.balance.update({
      where: { userId: (sender) },
      data: { amount: { decrement: amount } },
    });

    await tx.balance.update({
      where: { userId: receiverUser.id },
      data: { amount: { increment: amount } },
    });

    await tx.ptopTransfer.create({
      data: {
        senderId: (sender),
        receiverId: receiverUser.id,
        amount,
        timestamp: new Date()
      }
    })
  });
}