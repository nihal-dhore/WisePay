import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@wise/db/client";
import { AddMoney } from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransactions } from "../../components/OnRampTransactions";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: session?.user?.id,
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return txns.map((txn) => ({
    time: txn.startTime,
    amount: txn.amount,
    status: txn.status,
    provider: txn.provider,
  }));
}

export default async function() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return <div className="w-screen">
      <div className="text-4xl pt-8 mb-8 font-bold">
          Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
          <div>
              <AddMoney />
          </div>
          <div>
              <BalanceCard amount={balance.amount} locked={balance.locked} />
              <div className="pt-4">
                  <OnRampTransactions transactions={transactions} />
              </div>
          </div>
      </div>
  </div>
}