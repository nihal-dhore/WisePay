"use client";
import { usePathname, useRouter } from "next/navigation";

export const SidebarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname == href;

  return (
    <div
      className={`flex ${selected ? "font-bold p-2 px-8" : "text-gray-500 cursor-pointer p-2 px-8"}`}
      onClick={() => {
        router.push(href);
      }}
    >
      <div className="pr-2">{icon}</div>
      <div className={`font-bold ${selected ? "font-bold" : "text-gray-500"}`}>{title}</div>
    </div>
  );
};
