import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import { UserModel } from "./../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/signin",
  [
    check("email", "email is required.").isEmail(),
    check(
      "password",
      "enter a strong password. It must be at least 6 characters long."
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { email, password } = req.body;
      try {
        const user = await UserModel.findOne({ email: email });
        if (!user)
          return res
            .status(400)
            .json({ message: "Invalid username or password." });

        const isPwdMatched = await bcrypt.compare(password, user.password);
        if (isPwdMatched) {
          // person is who they saying they are
          const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET_KEY as string,
            {
              expiresIn: "1d",
            }
          );
          res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
          });
          return res.status(200).json({ userId: user._id });
        }

        return res
          .status(400)
          .json({ message: "Invalid username or password." });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong." });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);
