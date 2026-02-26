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

const signUpSchema = z.object({
  firstname: z.string().min(1, "Tên bắt buộc phải có"),
  lastname: z.string().min(1, "Họ bắt buộc phải có"),
  username: z.string().min(3, "Tên đăng nhập phải có ít nhất 3 ký tự"),
  email: z.email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const { firstname, lastname, username, email, password } = data;

    // gọi backend để signup
    await signUp(username, password, email, firstname, lastname);

    navigate("/signin");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-border shadow-lg max-w-md mx-auto w-full">
        <CardContent className="p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              {/* header - logo */}
              <div className="flex flex-col items-center text-center gap-3 mb-1">
                <a
                  href="/"
                  className="mx-auto flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl"
                >
                  <span className="text-2xl font-bold text-primary">N</span>
                </a>

                <div className="space-y-1">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Tạo tài khoản Nexo
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Chào mừng bạn! Hãy đăng ký để bắt đầu
                  </p>
                </div>
              </div>

              {/* họ & tên */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="lastname" className="text-sm font-medium">
                    Họ
                  </Label>
                  <Input
                    type="text"
                    id="lastname"
                    className="h-10"
                    placeholder="Nguyễn"
                    {...register("lastname")}
                  />

                  {errors.lastname && (
                    <p className="text-destructive text-sm">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="fistname" className="text-sm font-medium">
                    Tên
                  </Label>
                  <Input
                    type="text"
                    id="firstname"
                    className="h-10"
                    placeholder="Văn A"
                    {...register("firstname")}
                  />
                  {errors.firstname && (
                    <p className="text-destructive text-sm">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
              </div>

              {/* username */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="username" className="text-sm font-medium">
                  Tên đăng nhập
                </Label>
                <Input
                  type="text"
                  id="username"
                  className="h-10"
                  placeholder="Ví dụ: nexo123"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-destructive text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* email */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  className="h-10"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="password" className="text-sm font-medium">
                  Mật khẩu
                </Label>
                <Input
                  type="password"
                  id="password"
                  className="h-10"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* nút đăng ký */}
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium mt-3"
                disabled={isSubmitting}
              >
                Tạo tài khoản
              </Button>

              <div className="text-center text-sm text-muted-foreground mt-1">
                Đã có tài khoản?{" "}
                <a
                  href="/signin"
                  className="text-primary font-medium hover:underline"
                >
                  Đăng nhập
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
