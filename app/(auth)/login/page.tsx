import { LoginForm } from "@/components/login-form";
import { Suspense } from "react";

export default function Lignin() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <LoginForm></LoginForm>
    </Suspense>
  );
}
