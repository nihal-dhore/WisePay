import { Card } from "@repo/ui/card";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title={"Balance"}>
      <div className="flex justify-between border-b border-input pb-2 mt-2">
        <div>Unlocked balance</div>
        <div>{amount / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-input pb-2 mt-2">
        <div>Locked balance</div>
        <div>{locked / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-input pb-2 mt-2">
        <div>Total balance</div>
        <div>{locked + amount / 100} INR</div>
      </div>
    </Card>
  );
};
