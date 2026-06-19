import { redirect } from "next/navigation";
import { auth } from "@/auth";

import NewBlogForm from "@/app/components/NewBlogForm";

const NewBlog = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <NewBlogForm />
    </div>
  );
};

export default NewBlog;
