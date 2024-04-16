import { User } from "@/app/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";


connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    user.isVerifyed = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
