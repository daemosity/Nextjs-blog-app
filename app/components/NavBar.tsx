"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav>
      <Link href="/">home</Link>
      {" | "}
      <Link href="/users">users</Link>
      {" | "}
      <Link href="/blogs">blogs</Link>
      {" | "}
      {session ? (
        <>
          <Link href="/blogs/new">new blog</Link>
          {" | "}
          <Link href="/me">me</Link>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/login">login</Link>
          {" | "}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  );
}
