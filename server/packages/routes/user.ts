import { Router, Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { UserModel } from "../model/user";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/signup",
  check("firstName", "first name is required.").isString(),
  check("lastName", "last name is required.").isString(),
  check("email", "email is required").isEmail(),
  check(
    "password",
    "enter a string password. It must contain at least 6 characters."
  ).isLength({ min: 6 }),
  async (req: Request, res: Response) => {
    // check for errors
    const errors = validationResult(req);

    // if error is empty proceed with request
    if (errors.isEmpty()) {
      try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
          return res
            .status(400)
            .json({ message: "Account with provided email already exists." });
        }
        user = new UserModel(req.body);
        await user.save();
        const token = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET_KEY as string,
          { expiresIn: "1d" }
        );
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 86400000,
        });
        return res
          .status(200)
          .send({ message: "Account successfully registered." });
      } catch (error) {
        console.log("User signup route: ", error);
        return res.status(500).json({ message: "Something went wrong." });
      }
      // else return the errors field
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

export { router };
