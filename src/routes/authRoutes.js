import { Router } from 'express';
import { celebrate } from 'celebrate';
import { loginUser } from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), loginUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

export default router;
