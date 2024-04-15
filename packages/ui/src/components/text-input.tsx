"use client";

import { Input } from "./ui/input";

export const TextInput = ({
  placeholder,
  onChange,
  label,
}: {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
}) => {
  return (
    <div>
      <label className="block my-3 ml-1 font-medium">{label}</label>
      <Input
        type="number"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};
