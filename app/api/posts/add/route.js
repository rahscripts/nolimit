import db from "@/lib/db";
import Post from "../../../../models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function POST(req) {
    await db();
    console.log("db connected post");

    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({error: "Not authenticated"}, {status: 401});
    }

    const {title, imageUrl} = await req.json();

    await Post.create({
        title, 
        imageUrl,
        userId: session.user.id,
    });

    return Response.json({message: "Post added successfully"});
}