import { useFriendStore } from "@/stores/useFriendStore";
import { Card } from "../ui/card";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { MessageCircle } from "lucide-react";
import FriendListModal from "../createNewChat/FriendListModal";

const CreateNewChat = () => {
  const { getFriends } = useFriendStore();

  const handleGetFriends = async () => {
    await getFriends();
  };

  return (
    <div className="flex gap-2">
      <Card
        className="flex-1 p-3 border-transparent bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group/card shadow-none"
        onClick={handleGetFriends}
      >
        <Dialog>
          <DialogTrigger>
            <div className="flex items-center gap-4">
              <div className="size-8 bg-primary/20 rounded-full flex items-center justify-center group-hover/card:scale-105 transition-transform">
                <MessageCircle className="size-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Gửi tin nhắn mới
              </span>
            </div>
          </DialogTrigger>

          <FriendListModal />
        </Dialog>
      </Card>
    </div>
  );
};

export default CreateNewChat;
