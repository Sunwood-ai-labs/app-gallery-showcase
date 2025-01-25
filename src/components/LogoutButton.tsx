import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut({ 
        callbackUrl: '/login',
        redirect: true 
      });
      toast.success('ログアウトしました', {
        description: 'またのご利用をお待ちしております。'
      });
    } catch (error) {
      toast.error('ログアウトに失敗しました', {
        description: 'もう一度お試しください。'
      });
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLogout}
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      ログアウト
    </Button>
  );
}
