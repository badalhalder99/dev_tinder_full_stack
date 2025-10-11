const express = require("express")
require("dotenv").config()
const { connectDB } = require("./config/database")
const cookieParser = require('cookie-parser')
const app = express()
const cors = require("cors");
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser());

// ✅ Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")
const userRouter = require("./routes/user")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

connectDB().then(() => {
   console.log("Database connected successfully!")
   app.listen(PORT, () => {
      console.log(`Server is successfully running on ${PORT}`)
   })
}).catch(err => {
   console.error("Database can not be connected!")
})

