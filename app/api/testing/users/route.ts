import { insertUser } from "@/app/services/users";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            {error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }

    const body = await req.json();
    const { name, username, password} = body;
    if (!name || !username || !password) {
        return NextResponse.json(
            { error: "Invalid values provided"},
            { status: 400 }
        )
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await insertUser(username, name, passwordHash);

    revalidatePath('/users');
    return NextResponse.json({ success: true}, { status: 201});
}