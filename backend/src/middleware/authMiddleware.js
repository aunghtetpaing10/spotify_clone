import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  const userId = req.auth.userId;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: you must be logged in" });
  }

  next();
};

export const protectAdminRoute = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const currentUser = await clerkClient.users.getUser(userId);

    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress.emailAddress;

    if (!isAdmin) {
      return res.status(401).json({
        message: "Unauthorized: you must be an admin to access this route",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Unauthorized: you must be an admin to access this route",
    });
  }
};
