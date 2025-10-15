const express = require("express")
const authRouter = express.Router()
const { validateSignupData } = require("../utils/validate")
const { User } = require("../models/user")
const bcrypt = require('bcrypt')


//Signup API - post new users registered data into the database:
authRouter.post("/signup", async (req, res) => {
   try {
      //Validation of Data:
      validateSignupData(req)

      //Encrypt the password:
      const { password } = req.body
      const passwordHash = await bcrypt.hash(password, 10)

      // Destructure all required fields from request body
      const { firstName, lastName, emailId, gender, age, skills, about, photoUrl } = req.body;

      const newUser = {
         firstName,
         lastName,
         emailId,
         password: passwordHash,
         gender,
         age,
         skills,
         about,
         photoUrl
      }

      //Check if user already exists
      const existingUser = await User.findOne({ emailId });
      if (existingUser) {
         return res.status(400).send("Email already registered");
      }

      //creating a new instance of the user model
      const user = new User(newUser)

      const savedUser = await user.save()
      // Generate JWT token
      const token = await savedUser.getJWT();

      // Set cookie
      res.cookie("token", token, {
         httpOnly: true,
         sameSite: "strict",
         expires: new Date(Date.now() + 8 * 3600000)
      });

      res.json({
         status: 200,
         message: "User added successfully!",
         data: savedUser
      })
   } catch (err) {
      res.status(500).send(`Error saving the user: ${err.message}`);
   }
})

//Login API - Login new users:
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ emailId: emailId.toLowerCase() });

    if (!existingUser) {
      return res.status(404).send("User not found!");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).send("Invalid password!");
    }

    // Generate JWT token
    const token = await existingUser.getJWT();

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 8 * 3600000)
    });

   // ✅ Send user data back to frontend
   res.status(200).json({
      message: "User logged in successfully!",
      user: {
         _id: existingUser._id,
         firstName: existingUser.firstName,
         lastName: existingUser.lastName,
         emailId: existingUser.emailId,
         photoUrl: existingUser.photoUrl,
         skills: existingUser.skills,
         about: existingUser.about,
         age: existingUser.age,
         gender: existingUser.gender,
      },
      token,
   });

   console.log(user)
  } catch (err) {
    res.status(500).send(`Error logging in: ${err.message}`);
  }
});


//Logout API - Logout users:
authRouter.post("/logout", async (req, res) => {
   res.cookie("token", null, {
      expires: new Date(Date.now())
   })
   res.send("Logout Successfully!")
})


module.exports = authRouter;
