import { truncateAllTables } from "@/app/services/testing"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const DELETE = async () => {
    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            {error: "This endpoint is not available in production" },
            { status: 403 },
        );
    }

    await truncateAllTables();

    revalidatePath('/users');
    revalidatePath('/blogs');
    return NextResponse.json(
        { status: 204 }
    );
}