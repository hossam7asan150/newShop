import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
//@desc     Auth user & get token
//@route    GET /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
   // res.send("Login User");
   // console.log(req.body);
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (user && (await user.matchPassword(password))) {
      generateToken(res, user._id);
      res.json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
         // token: req.cookies.jwt,
      });
   } else {
      res.status(401);
      throw new Error("Invalid email or password".bgBlue);
   }
});

//@desc  Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
   // res.send("Register User");
   const { name, email, password } = req.body;
   const userExists = await User.findOne({ email });
   if (userExists) {
      res.status(400);
      throw new Error("already exists");
   }
   const user = await User.create({
      name,
      email,
      password,
   });
   if (user) {
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin,
      });
   } else {
      res.status(400);
      throw new Error("Invalid user data");
   }
});

//@desc  Logout user & clear cookie
//@route GET /api/users/logout
//@access Public
const logoutUser = asyncHandler(async (req, res) => {
   res.cookie("jwt", "logout", {
      httpOnly: true,
      expires: new Date(0),
   });
   res.status(200).json({ message: "logged out successfully" });
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
