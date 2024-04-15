"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const SelectComp = ({
  options,
  onSelect,
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
}) => {
  return (
    <Select
      onValueChange={(e) => {
        onSelect(e);
      }}
    >
      <SelectTrigger id="framework">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.key}>{option.value}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
