import { NextResponse } from "next/server"
import { headers } from 'next/headers'; 
import { getUserByAPIToken } from "@/app/services/users";

type ParsedAuth = {authToken: string | null};

export const GET = async () => {
  const headersList = await headers();
  const authorization = headersList.get('authorization');
  if (!authorization) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
  const {authToken} = parseAuthorization(authorization);
  if (!authToken) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserByAPIToken(authToken);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({ user }, { status: 200 })
}

const parseAuthorization = (auth: string): ParsedAuth => {
    const splitAuth = auth.split(' ');
    if (splitAuth.length !== 2 || splitAuth[0].toLowerCase() !== 'bearer') return {authToken: null};
    return { authToken: splitAuth[1] };
}