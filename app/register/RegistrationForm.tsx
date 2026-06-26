"use client";

import { useActionState, useEffect } from "react";
import { registerUser } from "@/app/actions/users";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";

const initialState = {
  error: "",
  success: false,
  testFlag: "",
};

const RegistrationForm = () => {
  const [state, formAction] = useActionState(registerUser, initialState);

  const { showNotification } = useNotification();
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      showNotification("User created successfully!");
      router.push("/login");
    } else {
      showNotification(state.error, "error", state.testFlag);
    }
  }, [state, showNotification, router]);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="username-input">Username</label>
        <input id="username-input" type="text" name="username" />
      </div>
      <div>
        <label htmlFor="irl-name">Name</label>
        <input id="irl-name" type="text" name="name" />
      </div>
      <div>
        <label htmlFor="password-input">Password</label>
        <input id="password-input" type="password" name="password" />
      </div>
      <div>
        <label htmlFor="password-confirm">Confirm Password</label>
        <input id="password-confirm" type="password" name="passwordConfirm" />
      </div>
      <button type="submit" data-testid="register-button">
        Register
      </button>
      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
};

export default RegistrationForm;
