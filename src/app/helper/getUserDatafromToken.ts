import { User } from "@/app/models/userModel";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connect();

export const getUserDataFromToken = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    const user: any = await jwt.verify(token, process.env.JWT_SECRET!);
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    return user.id;
    
  } catch (error: any) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }
};
