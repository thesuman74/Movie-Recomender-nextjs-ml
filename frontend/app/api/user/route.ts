import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// Define schema for user input validation
const userSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: Request) {
  try {
    // Parse and validate the request body against the schema
    const body = await req.json();
    userSchema.parse(body);

    const { email, password } = body;

    // Check if an email already exists to avoid duplicate accounts
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Server:User with this email already exists" },
        { status: 409 } // 409 Conflict
      );
    }

    // Hash the password to ensure security
    const hashedPassword = await hash(password, 10);

    // Create a new user in the database with the hashed password
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Exclude password from the response for security reasons
    const { password: _, ...rest } = newUser;

    // Return successful user creation response
    return NextResponse.json({
      user: rest,
      message: "Server:User created successfully",
      status: 201, // 201 Created
    });
  } catch (error) {
    // Handle and log any errors during the process
    console.error(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Server:Validation failed", errors: error.errors },
        { status: 400 } // 400 Bad Request
      );
    }
    return NextResponse.json(
      { message: "Server:Internal Server Error" },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
