import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
//@desc     Auth user & get token
//@route    GET /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
   // res.send("Login User");
   // console.log(req.body);
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
         expiresIn: "30d",
      });

      //set JWT as HTTP-only cookie
      res.cookie("jwt", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV !== "development",
         sameSite: "strict",
         maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
      });

      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(401);
      throw new Error("Invalid email or password");
   }
});

//@desc  Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
   res.send("Register User");
});

//@desc  Logout user & clear cookie
//@route GET /api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
   res.send("Logout User");
});

//@desc  Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
   res.send("Profile User");
});

//@desc  Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
   res.send("Update Profile User");
});

//@desc  Get all users
//@route GET /api/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
   // res.send("Get All Users");
   const users = await User.find({});
   res.json(users);
});

//@desc  Delete user
//@route DELETE /api/users/:id
//@access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
   res.send("Delete User");
});

//@desc  Get user by ID
//@route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
   // res.send("Get User By ID");
   const user = await User.findById(req.params.id);
   if (user) {
      res.json(user);
   } else {
      res.status(404);
      throw new Error("User not found");
   }
});

//@desc  Update user
//@route PUT /api/users/:id
//@access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
   // res.send("Update User");
});

export {
   authUser,
   registerUser,
   logoutUser,
   getUserProfile,
   updateUserProfile,
   getUsers,
   deleteUser,
   getUserById,
   updateUser,
};
