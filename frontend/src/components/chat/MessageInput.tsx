import { useAuthStore } from "@/stores/useAuthStore";
import type { Conversation } from "@/types/chat";
import { useState } from "react";
import { Button } from "../ui/button";
import { ImagePlus, Send } from "lucide-react";
import { Input } from "../ui/input";
import EmojiPicker from "./EmojiPicker";
import { useChatStore } from "@/stores/useChatStore";
import { toast } from "sonner";

const MessageInput = ({ selectedConvo }: { selectedConvo: Conversation }) => {
  const { user } = useAuthStore();
  const { sendDirectMessage, sendGroupMessage } = useChatStore();
  const [value, setValue] = useState("");

  if (!user) return;

  const sendMessage = async () => {
    if (!value.trim()) return;
    const currValue = value;
    setValue("");

    try {
      if (selectedConvo.type === "direct") {
        const participants = selectedConvo.participants;
        const otherUser = participants.filter((p) => p._id !== user._id)[0];
        await sendDirectMessage(otherUser._id, currValue);
      } else {
        await sendGroupMessage(selectedConvo._id, currValue);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi xảy ra khi gửi tin nhắn. Bạn hãy thử lại!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-background border-t border-border/50 min-h-[64px]">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground hover:bg-secondary/80 flex-shrink-0"
      >
        <ImagePlus className="size-5" />
      </Button>

      <div className="flex-1 relative bg-secondary/30 rounded-full border border-border/50 focus-within:ring-1 focus-within:ring-primary/50 transition-all flex items-center pr-12">
        <Input
          onKeyPress={handleKeyPress}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Viết tin nhắn..."
          className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4 h-10 w-full"
        />
        <div className="absolute right-1">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground hover:text-foreground rounded-full hover:bg-secondary/80 cursor-pointer"
          >
            <div>
              <EmojiPicker
                onChange={(emoji: string) => setValue(`${value}${emoji}`)}
              />
            </div>
          </Button>
        </div>
      </div>

      <Button
        onClick={sendMessage}
        size="icon"
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex-shrink-0 size-10 shadow-sm"
        disabled={!value.trim()}
      >
        <Send className="size-4" />
      </Button>
    </div>
  );
};

export default MessageInput;
