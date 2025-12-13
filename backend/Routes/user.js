    import express from "express";
    import User from "../models/User.js";
    import { generateHash, compareHash } from "../util/password.js";
    import { generateAccessToken } from "../util/jwt_token.js";
    import { verifyUserDetails } from "../middleware/verify_user_details.js";
    import { verifyJwtToken } from "../middleware/verify_jwt_token.js";
    const router = express.Router();


    // router.post("/login", async (req, res) => {
    // try {
    // const { username, password, usertype } = req.body;
    // const user = await User.findOne({ username, usertype });
    // if (!user) return res.status(401).json({ message: "Invalid credentials" });
    // const match = await compareHash(password, user.password);
    // if (!match) return res.status(401).json({ message: "Invalid password"
    // });
    // const payload = { username: user.username, usertype: user.usertype, id: user._id };
    // const token = generateAccessToken(payload);
    // res.status(200).json({ message: "Login successful", token });
    // } catch (error) {
    // res.status(500).json({ message: "Internal server error" });
    // }
    // });


    // router.post("/login", async (req, res) => {
    //   try {
    //     const { username, password, usertype } = req.body;
    //     console.log("Login attempt:", username, usertype);

    //     const user = await User.findOne({ username, usertype });
    //     if (!user) {
    //       console.log("User not found");
    //       return res.status(401).json({ message: "Invalid credentials" });
    //     }
    //     console.log("User found:", user.username);

    //     const match = await compareHash(password, user.password);
    //     console.log("Password match result:", match);

    //     if (!match) {
    //       return res.status(401).json({ message: "Invalid password" });
    //     }

    //     if (!process.env.SECRET_KEY) {
    //       console.error("SECRET_KEY missing in .env");
    //       return res.status(500).json({ message: "Server misconfiguration" });
    //     }

    //     const payload = { username: user.username, usertype: user.usertype, id: user._id };
    //     const token = generateAccessToken(payload);

    //     res.status(200).json({ message: "Login successful", token });
    //   } catch (error) {
    //     console.error("Login error:", error);
    //     res.status(500).json({ message: "Internal server error" });
    //   }
    // });


    // router.post("/login", async (req, res) => {
    // try {
    //     let { username, password, usertype } = req.body;

    //     // Trim inputs to avoid invisible whitespace issues
    //     username = username.trim();
    //     password = password.trim();
    //     usertype = usertype.trim();

    //     console.log("Login attempt:", username, usertype);

    //     // Find user in DB
    //     const user = await User.findOne({ username, usertype });
    //     if (!user) {
    //     console.log("User not found");
    //     return res.status(401).json({ message: "Invalid credentials" });
    //     }
    //     console.log("User found:", user.username);

    //     // Compare password with bcrypt
    //     const match = await compareHash(password, user.password);
    //     console.log("Password match result:", match);

    //     if (!match) {
    //     return res.status(401).json({ message: "Invalid password" });
    //     }

    //     // Ensure SECRET_KEY exists
    //     if (!process.env.SECRET_KEY) {
    //     console.error("SECRET_KEY missing in .env");
    //     return res.status(500).json({ message: "Server misconfiguration" });
    //     }

    //     // Generate JWT
    //     const payload = { username: user.username, usertype: user.usertype, id: user._id };
    //     const token = generateAccessToken(payload);

    //     res.status(200).json({ message: "Login successful", token });
    // } catch (error) {
    //     console.error("Login error:", error);
    //     res.status(500).json({ message: "Internal server error" });
    // }
    // });

    router.post("/login", async (req, res) => {
  try {
    let { username, password, usertype } = req.body;

    // Trim inputs to avoid invisible whitespace issues
    username = username.trim();
    password = password.trim();
    usertype = usertype.trim();

    console.log("Login attempt:", username, usertype);

    // Find user in DB
    const user = await User.findOne({ username, usertype });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("User found:", user.username);

    // Compare password with bcrypt
    const match = await compareHash(password, user.password);
    console.log("Password match result:", match);

    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Ensure SECRET_KEY exists
    if (!process.env.SECRET_KEY) {
      console.error("SECRET_KEY missing in .env");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    // Generate JWT
    const payload = { username: user.username, usertype: user.usertype, id: user._id };
    const token = generateAccessToken(payload);

    // ✅ Return token + user details
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        usertype: user.usertype,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



    router.post("/register", verifyUserDetails, async (req, res) => {
    try {
        const { firstName, lastName, username, password, usertype } = req.body;

        // Basic validation (in addition to verifyUserDetails)
        if (!firstName || !username || !password || !usertype) {
        return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if user already exists
        const existing = await User.findOne({ username, usertype });
        if (existing) {
        return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await generateHash(password);

        // Create user
        await User.create({
        firstName,
        lastName,
        username,
        password: hashedPassword,
        usertype,
        });

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Register error:", error);

        // Handle duplicate key error from MongoDB
        if (error.code === 11000) {
        return res.status(400).json({ message: "Username already taken" });
        }

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
        return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: "Internal server error" });
    }
    });


    // router.post("/register", verifyUserDetails, async (req, res) => {
    //   try {
    //     const { firstName, lastName, username, password, usertype } = req.body;

    //     const existing = await User.findOne({ username, usertype });
    //     if (existing) return res.status(400).json({ message: "User already exists" });

    //     const hashedPassword = await generateHash(password);

    //     await User.create({
    //       firstName,
    //       lastName,
    //       username,
    //       password: hashedPassword,
    //       usertype
    //     });

    //     res.status(200).json({ message: "User registered successfully" });
    //   } catch (error) {
    //     console.error("Register error:", error.message);
    //     res.status(500).json({ message: error.message });
    //   }
    // });




    router.get("/profile", verifyJwtToken, async (req, res) => {
    try {
    const user = await User.findById(req.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" })
    ;
    res.status(200).json({ status: "success", data: user });
    } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    }
    });
    export default router;