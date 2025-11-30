import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await db();
    console.log("db connected for POST");
    const {name, email, password} = await req.json();

    const already = await User.findOne({email});
    if (already) {
        return Response.json({error: "Email already exists"});
    }

    const hashed = await bcrypt.hash(password,10);

    await User.create({name, email, password:hashed});

    return Response.json({message: "Account Created"});
}