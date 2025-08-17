import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "$/models/User.model.js";
import authService from "$/services/auth.service.js";
export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, phone, email, password, userType, adminType, otp } = req.body;

    if (!otp) {
      res.status(400).json({ message: "OTP is required" });
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      res.status(400).json({ message: "OTP must be a 6-digit number" });
      return;
    }
    const existingUser = await UserModel.findOne({ email, userType }).lean();
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
      userType,
      adminType,
    });
    // await SubscriptionModel.create({
    //   createdBy: newUser._id,
    // });
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.created({
      data: userWithoutPassword,
      message: "User Created Successfully",
    });
    return;
  } catch (error) {
    next(error);
  }
};
export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    // if (!userType) {
    //   res
    //     .status(400)
    //     .json({ message: `userType is required ${Object.values(USER_TYPE)}` });
    //   return;
    // }
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }

    const userObj = user.toObject();
    const { password: _, ...userWithoutPassword } = userObj;

    const token = authService.generateToken(user._id.toString());

    res.success({
      data: {
        token,
        user: userWithoutPassword,
      },
      message: "User Logged In Successfully",
    });
    //  res.success(
    //   {
    //     token,
    //     user: userWithoutPassword,
    //   },
    //   "User Logged In Successfully"
    // );
    return;
  } catch (error) {
    next(error);
  }
};

export const ForgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password: newPassword, otp } = req.body;

    if (!otp || !email || !newPassword) {
      res
        .status(400)
        .json({ message: "OTP, email, and password are required" });
      return;
    }


    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const user = await UserModel.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true, select: "-password" }
    ).lean();

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    res.success({
      data: user,
      message: "Password reset successfully",
    });

    // return res.success(user, "Password reset successfully");
    return;
  } catch (error) {
    next(error);
  }
};
