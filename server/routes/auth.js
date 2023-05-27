import * as dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import { Router } from "express";
import * as bcrypt from "bcrypt";
<<<<<<< HEAD
import { json } from "express";

=======
import jsonwebtoken from 'jsonwebtoken';
>>>>>>> b04d3d6294c9e8118d9c34c1f252ab2299a7a75f
import { User } from "../models/User.js";
// import * as keys from "../server/config.env";
const router = Router();

// Create / Register User

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  // Add Validation Steps

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "You already have an account!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    const result = await newUser.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }
});

// Login User

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "User does not exist!" });

      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      // ADD VALIDATIONS

      if (isPasswordCorrect){
        const { password, id, email, issues, projects } = user._doc;
        const payload = {  password, id, email, issues, projects };
        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: 3600 })

        const userFound = { ...user._doc }

        return res.status(200).json({
            success: true,
            token, 
            userFound
            // token: "Bearer " + token
          });
        
      } else {
        return res.status(400).json({ error: "Incorrect Password!"});
      }

  } catch (err) {
    console.log(`${err}`);
    return res.status(500).json({ error: err.message });
  }

})

export default router;
