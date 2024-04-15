import { Button } from "@repo/ui/button";
import { ModeToggle } from "./ui/mode-toggle";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4 border-input">
      <div className="text-lg flex flex-col justify-center">WisePay</div>
      <div className="flex gap-4 justify-center py-2">
        <Button
          onClick={user ? onSignout : onSignin}
          children={user ? "Logout" : "login"}
          className="px-5 py-2 border-1 rounded-lg border-gray-500"
        />
        <ModeToggle />
      </div>
    </div>
  );
};
