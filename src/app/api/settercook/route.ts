import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    let body = await req.json() || "";

    if (!!body && !!body.token) {
        await cookies().set("accessToken", body.token);
        return NextResponse.json({ status: true })
    }
    return NextResponse.json({ status: false })
}