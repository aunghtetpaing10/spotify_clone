import User from "../models/userModel.js";

const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // Check if the user already exists in the database
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      // If the user does not exist, create a new user
      const newUser = new User({
        clerkId: id,
        fullName: `${firstName || ""} ${lastName || ""}`.trim(),
        imageUrl,
      });

      await newUser.save();
    }

    res.status(200).json({success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export { authCallback };
