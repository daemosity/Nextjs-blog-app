import { auth } from "@/auth"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"

export const getCurrentUser = async () => {
  const session = await auth()
  if (!session?.user?.email) {
    return null
  }

  return db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  })
}

export const getCurrentUserReadingList = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  return await db.query.users.findFirst({
      where: eq(users.username, session.user.email),
      columns: {
        id: true,
      },
      with: {
        readingList: {
          columns: {
            blogId: true,
            read: true,
          },
          with: {
            blog: {
              columns: {
                title: true
              }
            }
          }
        }
      }
  })
}