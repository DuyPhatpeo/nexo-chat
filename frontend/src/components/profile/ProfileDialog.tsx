import type { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ProfileCard from "./ProfileCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import PersonalInfoForm from "./PersonalInfoForm";
import PreferencesForm from "./PreferencesForm";
import PrivacySettings from "./PrivacySettings";

interface ProfileDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProfileDialog = ({ open, setOpen }: ProfileDialogProps) => {
  const { user } = useAuthStore();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[95vh] p-0 border border-border/50 shadow-xl sm:rounded-2xl bg-card overflow-hidden w-full max-w-4xl mx-auto">
        <div className="flex flex-col h-full max-h-[95vh] overflow-y-auto beautiful-scrollbar">
          <div className="p-6">
            {/* heading */}
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-foreground">
                Profile & Settings
              </DialogTitle>
            </DialogHeader>

            <ProfileCard user={user} />

            <Tabs defaultValue="personal" className="my-6">
              <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="personal"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  Tài Khoản
                </TabsTrigger>
                <TabsTrigger
                  value="preferences"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  Cấu Hình
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
                >
                  Bảo Mật
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoForm userInfo={user} />
              </TabsContent>

              <TabsContent value="preferences">
                <PreferencesForm />
              </TabsContent>

              <TabsContent value="privacy">
                <PrivacySettings />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
