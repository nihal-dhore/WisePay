import { Card } from "@repo/ui/card";
import type { OnRampStatus } from "@prisma/client";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: OnRampStatus;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="flex flex-col gap-3 mt-3">
        {transactions.map((trn) => (
          <div key={Math.random()} className="flex justify-between gap-2">
            <div>
              <div className="text-sm">Received INR</div>
              <div>{trn.time.toDateString()}</div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {trn.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
