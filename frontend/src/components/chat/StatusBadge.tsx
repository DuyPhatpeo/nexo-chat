import { cn } from "@/lib/utils";

const StatusBadge = ({ status }: { status: "online" | "offline" }) => {
  return (
    <div
      className={cn(
        "absolute -bottom-0.5 -right-0.5 size-4 rounded-full border-2 border-background z-10 transition-colors",
        status === "online"
          ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
          : "bg-slate-400",
      )}
    ></div>
  );
};

export default StatusBadge;
