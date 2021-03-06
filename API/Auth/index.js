// Library
import express from "express";
import { bcrypt } from "bcrypt";
import { jwt } from "jsonwebtoken";

//Models
import { UserModel } from "../../database/user";

const Router = express.Router();

/*
Route   /signup
Des     Signup with email and password
Params  none
Access  public
Method  POST
*/

Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullname, phoneNumber } = req.body.credentials;

    // check weather email exist
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
      return res.json({ error: "User already exist!" });
    }

    //Hash the password
    const bcryptSalt = await bcrypt.genSalt(8);

    const hashedPassword = await bcrypt.hash(password, bcryptSalt);

    // save to database
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });

    //generate JWT token
    const token = jwt.sign({ user: { fullname, email } }, "ZomatoAPP");

    //return
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
