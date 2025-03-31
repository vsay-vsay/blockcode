import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "~/components/template/Login/org-login-form";
import { vsayPng } from "~/images";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY || Login" },
    { name: "login", content: "Welcome to VSAY Portal" },
  ];
}

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <img src={vsayPng} alt="VsAY LOGO" />
            </div>
            VSAY
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
