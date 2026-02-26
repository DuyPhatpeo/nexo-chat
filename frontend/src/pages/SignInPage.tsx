import { SigninForm } from "@/components/auth/signin-form";

const SignInPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]">
      <div className="w-full max-w-sm md:max-w-4xl z-10">
        <SigninForm />
      </div>
    </div>
  );
};

export default SignInPage;
