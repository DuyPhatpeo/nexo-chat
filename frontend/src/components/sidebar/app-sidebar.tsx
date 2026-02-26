import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";
import CreateNewChat from "../chat/CreateNewChat";
import NewGroupChatModal from "../chat/NewGroupChatModal";
import GroupChatList from "../chat/GroupChatList";
import AddFriendModal from "../chat/AddFriendModal";
import DirectMessageList from "../chat/DirectMessageList";
import { useThemeStore } from "@/stores/useThemeStore";
import { useAuthStore } from "@/stores/useAuthStore";
import ConversationSkeleton from "../skeleton/ConversationSkeleton";
import { useChatStore } from "@/stores/useChatStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDark, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();
  const { convoLoading } = useChatStore();

  return (
    <Sidebar variant="inset" {...props}>
      {/* Header */}
      <SidebarHeader className="border-b border-border/50 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <a href="#">
                <div className="flex w-full items-center px-1 justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                      <span className="text-lg font-bold text-primary">N</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Nexo</h1>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-secondary/50 border border-border/50">
                    <Sun className="size-3.5 text-muted-foreground" />
                    <Switch
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                      className="scale-75 data-[state=checked]:bg-primary"
                    />
                    <Moon className="size-3.5 text-muted-foreground" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="beautiful-scrollbar">
        {/* New Chat */}
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group Chat */}
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel className="uppercase">
              nhóm chat
            </SidebarGroupLabel>
            <NewGroupChatModal />
          </div>

          <SidebarGroupContent>
            {convoLoading ? <ConversationSkeleton /> : <GroupChatList />}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Dirrect Message */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">bạn bè</SidebarGroupLabel>
          <SidebarGroupAction title="Kết Bạn" className="cursor-pointer">
            <AddFriendModal />
          </SidebarGroupAction>

          <SidebarGroupContent>
            {convoLoading ? <ConversationSkeleton /> : <DirectMessageList />}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
