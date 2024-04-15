"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { ptoPTransfer } from "../lib/actions/ptoPTransfer";

export const PtoPTransferCard = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);

  console.log(amount);
  
  return (
    <div className="w-full">
      <Card title="P2P Transfer">
        <div>
          <TextInput
            label="Phone Number"
            onChange={(value) => setPhone(value)}
            placeholder="Phone Number"
          />
          <TextInput
            label="Amount"
            onChange={(value) => setAmount(Number(value) * 100)}
            placeholder="Amount"
          />
          <div className="flex justify-center mt-5">
            <Button
              onClick={async () => await ptoPTransfer(phone, amount)}
            >
              Pay Now --{">"}{" "}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
