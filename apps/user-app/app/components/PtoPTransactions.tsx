import { Card } from "@repo/ui/card";

interface transaction {
  id: string;
  amount: number;
  timestamp: Date;
  receiver: {
    number: string;
    id: string;
    name: string | null;
  };
  sender: {
    number: string;
    id: string;
    name: string | null;
  };
}

export const PtoPTransactions = async ({
  receivedTransactions,
  sentTransactions,
}: {
  receivedTransactions: transaction[];
  sentTransactions: transaction[];
}) => {
  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <Card title="Received Transactions">
        {receivedTransactions.length === 0 ? (
          <div className="w-[265px] shrink-0">No Transactions</div>
        ) : (
          <div className="mt-3">
            {receivedTransactions.map((tx) => (
              <div className="flex gap-20" key={tx.id}>
                <div>
                  <div>
                    {tx.sender.name}
                    <div className="text-gray-400 text-sm">
                      {tx.timestamp.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">{`- Rs ${tx.amount / 100}`}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
      <Card title="Sent Transactions">
        {sentTransactions.length === 0 ? (
          <div className="w-[265px] shrink-0">No Transactions</div>
        ) : (
          <div className="mt-3">
            {sentTransactions.map((tx) => (
              <div className="flex gap-20 shrink-0" key={tx.id}>
                <div>
                  <div>
                    {tx.sender.name}
                    <div className="text-gray-400 text-sm">
                      {tx.timestamp.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center shrink-0">{`- Rs ${tx.amount / 100}`}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
