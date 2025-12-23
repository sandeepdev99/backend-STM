import {User} from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import { generateAccessToken } from '../utils/jwt.js';

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, password } = req.body;

  if (!fullName || !username || !password) {
    throw new ApiError(400, 'All fields are required');
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await User.create({ fullName, username, password });

  const token = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  res.status(201).json(
    new ApiResponse(
      201,
      {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          username: user.username,
          role: user.role,
        },
      },
      'User registered successfully'
    )
  );
});


//Login Controller
export const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, 'username and password required');
  }

  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = generateAccessToken({
    id: user._id,
    role: user.role,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          username: user.username,
          role: user.role,
        },
      },
      'Login successful'
    )
  );
});

