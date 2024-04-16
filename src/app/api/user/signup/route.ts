import { User } from "@/app/models/userModel";
import bcrypt from "bcrypt";
import { connect } from "@/app/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/app/helper/nodemailer";

connect();

interface signUpProps {
  username: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!(username && email && password)) {
      return NextResponse.json(
        { message: "Please enter all the fields" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }
    const hashPassword = await bcrypt.hash(password.toString(), 10);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser)
    // sendEmail for Verification user
    await sendEmail({email, emailType : "VERIFY",  userId: savedUser._id})
    
    return NextResponse.json(
      {
        message: "user created successfully",
        success: true,
        savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
