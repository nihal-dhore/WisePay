"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { SelectComp } from "@repo/ui/select";
import { TextInput } from "@repo/ui/text-input";
import { useState } from "react";
import { createOnRampTransaction } from "../lib/actions/createOnRampTrn";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || " ");
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder="Amount"
          onChange={(value) => {
            setAmount(Number(value) * 100);
          }}
        />
        <div className="my-2">Bank</div>
        <SelectComp
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(amount, provider);
              window.location.href = redirectUrl || "";
            }}
            className={`border-1 px-4 py-2 rounded-lg border-gray-400`}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
