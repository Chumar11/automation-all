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

    const { id } = req.query;

    // PUT - Update user
    if (req.method === "PUT") {
      const { email, password, role ,browserLimit} = req.body;
      const updateData: any = { email, role,browserLimit };

      // Only hash and update password if provided
      if (password) {
        updateData.password = await hash(password, 12);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      }).select("-password");

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json(updatedUser);
    }

    // DELETE - Remove user
    if (req.method === "DELETE") {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ message: "User deleted successfully" });
    }

    return res
      .status(405)
      .json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error("Error in users API:", error);
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
