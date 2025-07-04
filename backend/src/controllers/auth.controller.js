import { upsertStreamUser }
 from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  // Handle signup logic here
  let { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    try {
      await upsertStreamUser({

        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log(`Stream user upserted successfully ${newUser.fullName}`);
    } catch (error) {
      console.error("Error upserting Stream user:", error);
      return res.status(500).json({
        message: "Failed to create user in Stream",
      });
    }

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
    });

    res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  // Handle login logic here
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  // Handle logout logic here
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

export const onboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, bio, location, learningLanguage, nativeLanguage } =
      req.body;
    if (
      !fullName ||
      !bio ||
      !location ||
      !learningLanguage ||
      !nativeLanguage
    ) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !location && "location",
          !learningLanguage && "learningLanguage",
          !nativeLanguage && "nativeLanguage",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...req.body, isOnboarded: true },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

 try {
  await upsertStreamUser({
    id: updatedUser._id.toString(),
    name: updatedUser.fullName,
    image: updatedUser.profilePic || "",
  })
 } catch (error) {
  
 }


    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error during onboarding:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
