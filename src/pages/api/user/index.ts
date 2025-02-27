import { NextApiRequest, NextApiResponse } from "next";
import { AuthGuard } from "src/guards/backend/AuthGuard";
import User from "src/lib/models/users";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Authenticate request
    const authHeader = req.headers.authorization;
    const jwtPayload = await AuthGuard(authHeader, res);

    if (!jwtPayload?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // GET - Fetch all users
    if (req.method === "GET") {
      const users = await User.find({})
        .select("-password")
        .sort({ createdAt: -1 });
      return res.status(200).json(users);
    }

    // POST - Create new user
    if (req.method === "POST") {
      const { email, password, role,browserLimit } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      // Hash password
      const hashedPassword = await hash(password, 12);

      const newUser = await User.create({
        email,
        password: hashedPassword,
        role: role || "user",
        browserLimit,
      });

      const { password: _, ...userWithoutPassword } = newUser.toObject();
      return res.status(201).json(userWithoutPassword);
    }

    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("Error in users API:", error);
    return res.status(500).json({ 
      message: error instanceof Error ? error.message : "Internal server error" 
    });
  }
}