import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const signInSchema = z.object({
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignInFormValues = z.infer<typeof signInSchema>;

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    const { username, password } = data;
    await signIn(username, password);
    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border shadow-lg max-w-md mx-auto w-full">
        <CardContent className="p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* header - logo */}
              <div className="flex flex-col items-center text-center gap-3 mb-2">
                <a
                  href="/"
                  className="mx-auto flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl"
                >
                  <span className="text-2xl font-bold text-primary">N</span>
                </a>

                <div className="space-y-1">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Chào mừng quay lại
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Đăng nhập vào tài khoản Nexo của bạn
                  </p>
                </div>
              </div>

              {/* username */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Tên đăng nhập
                </Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Nhập tên đăng nhập..."
                  className="h-11"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Mật khẩu
                  </Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <Input
                  type="password"
                  id="password"
                  className="h-11"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* nút đăng nhập */}
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium mt-2"
                disabled={isSubmitting}
              >
                Đăng nhập
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-2">
                Chưa có tài khoản?{" "}
                <a
                  href="/signup"
                  className="text-primary font-medium hover:underline"
                >
                  Đăng ký ngay
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className=" text-xs text-balance px-6 text-center *:[a]:hover:text-primary text-muted-foreground *:[a]:underline *:[a]:underline-offetset-4">
        Bằng cách tiếp tục, bạn đồng ý với <a href="#">Điều khoản dịch vụ</a> và{" "}
        <a href="#">Chính sách bảo mật</a> của chúng tôi.
      </div>
    </div>
  );
}
