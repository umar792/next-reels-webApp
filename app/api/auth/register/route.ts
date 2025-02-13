import { ErrorHandler } from "@/helpers/error";
import { dbConnector } from "@/lib/db";
import { userModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { userName, email, password } = await req.json();

    if (!userName || !email || !password) {
      throw new ErrorHandler(400, "All fields are required");
    }

    await dbConnector();

    const isUser = await userModel.findOne({ email });

    if (isUser) {
      throw new ErrorHandler(400, "User already exists");
    }

    await userModel.create({
      userName: userName,
      email: email,
      password: password,
    });

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    throw new ErrorHandler(500, error.message);
  }
}
