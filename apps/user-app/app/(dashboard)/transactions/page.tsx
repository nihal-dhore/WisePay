import prisma from "@wise/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { PtoPTransactions } from "../../components/PtoPTransactions";
export default async function () {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const transactions = await getPtoPTransactions();
  const receivedTransactions = transactions.filter(
    (tx) => tx.receiver.id === userId
  );
  const sentTransactions = transactions.filter((tx) => tx.sender.id === userId);
  return (
    <div className="relative w-fit h-fit m-auto inset-0">
      <PtoPTransactions
        receivedTransactions={receivedTransactions}
        sentTransactions={sentTransactions}
      />
    </div>
  );
}

const getPtoPTransactions = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const transactions = await prisma.ptopTransfer.findMany({
    where: {
      senderId: userId,
    },
    orderBy: {
      timestamp: "asc",
    },
    select: {
      id: true,
      amount: true,
      timestamp: true,
      sender: {
        select: {
          id: true,
          name: true,
          number: true,
        },
      },
      receiver: {
        select: {
          id: true,
          name: true,
          number: true,
        },
      },
    },
  });

  return transactions;
};
