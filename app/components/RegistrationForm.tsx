"use client";

import { useActionState } from "react";
import { registerUser, RegistrationFormData } from "@/app/actions/users";

const initialState: RegistrationFormData = {
  error: "",
  values: {
    username: "",
    name: "",
    password: "",
    passwordConfirm: "",
  },
};

const RegistrationForm = () => {
  const [state, formAction] = useActionState(registerUser, initialState);
  return (
    <form action={formAction}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          defaultValue={state.values?.username}
        />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" defaultValue={state.values?.name} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          defaultValue={state.values?.password}
        />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Confirm Password:</label>
        <input
          type="password"
          name="passwordConfirm"
          defaultValue={state.values?.passwordConfirm}
        />
      </div>
      <button type="submit">Register</button>
      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
};

export default RegistrationForm;
