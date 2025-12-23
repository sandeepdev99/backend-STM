import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

console.log("lover")

router.route("/register").post(registerUser)
router.post('/login', loginUser);

export default router;
