import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";

const ChatWelcomeScreen = () => {
  return (
    <SidebarInset className="flex w-full h-full bg-background">
      <ChatWindowHeader />
      <div className="flex bg-card flex-1 items-center justify-center m-4 rounded-2xl border border-border/50 shadow-sm">
        <div className="text-center max-w-sm px-6">
          <div className="size-20 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
            <span className="text-4xl text-primary">👋</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">
            Chào mừng bạn đến với Nexo!
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Chọn một cuộc hội thoại từ danh sách bên trái để bắt đầu nhắn tin
            hoặc tạo cuộc trò chuyện mới.
          </p>
        </div>
      </div>
    </SidebarInset>
  );
};

export default ChatWelcomeScreen;
