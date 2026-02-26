import type { User } from "@/types/user";
import { Card, CardContent } from "../ui/card";
import UserAvatar from "../chat/UserAvatar";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useSocketStore } from "@/stores/useSocketStore";
import AvatarUploader from "./AvatarUploader";

interface ProfileCardProps {
  user: User | null;
}

const ProfileCard = ({ user }: ProfileCardProps) => {
  const { onlineUsers } = useSocketStore();
  if (!user) return;

  if (!user.bio) {
    user.bio = "Will code for food 💻";
  }

  const isOnline = onlineUsers.includes(user._id) ? true : false;

  return (
    <Card className="overflow-hidden p-0 border-none shadow-none rounded-none bg-transparent">
      <div className="h-32 bg-primary/10 w-full rounded-xl mb-12 relative">
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            <UserAvatar
              type="profile"
              name={user.displayName}
              avatarUrl={user.avatarUrl ?? undefined}
              className="ring-4 ring-background shadow-md size-24 text-2xl"
            />
            <AvatarUploader />
          </div>
        </div>
      </div>

      <CardContent className="pb-6 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 px-6">
        {/* user info */}
        <div className="text-center sm:text-left flex-1 sm:ml-4">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {user.displayName}
          </h1>

          {user.bio && (
            <p className="text-muted-foreground text-sm mt-1 max-w-lg line-clamp-2">
              {user.bio}
            </p>
          )}
        </div>

        {/* status */}
        <div className="flex -mt-8 sm:mt-0">
          <Badge
            variant="outline"
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 capitalize border-border/50",
              isOnline
                ? "bg-green-500/10 text-green-600 border-green-200"
                : "bg-muted text-muted-foreground",
            )}
          >
            <div
              className={cn(
                "size-1.5 rounded-full",
                isOnline ? "bg-green-500 animate-pulse" : "bg-slate-400",
              )}
            />
            <span className="font-medium text-xs">
              {isOnline ? "Online" : "Offline"}
            </span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
