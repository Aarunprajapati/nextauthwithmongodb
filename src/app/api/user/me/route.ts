import { User } from "@/app/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { getUserDataFromToken } from "@/app/helper/getUserDatafromToken";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await getUserDataFromToken(req);
        const user = await User.findById(userId).select("-password");
        if(!user){
            return NextResponse.json({
                message: "user not found",
                success: false,
            })
        }
        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}