import {Router} from 'express';
import * as userController from '../controllers/user.controllers.js';
import {body} from 'express-validator';
import * as authMiddleware from '../middleware/auth.middleware.js';
const router=Router();

router.post('/register',
      body('email').isEmail().withMessage('Email must be valid'),
      body('password').isLength({min:3}).withMessage('Password must be of minimum 3 characters'),
      userController.createUserController);

router.post('/login',
      body('email').isEmail().withMessage('Email must be valid'),
      body('password').isLength({min:3}).withMessage('Password must be of minimum 3 characters'),
      userController.loginUserController);

router.get('/profile',authMiddleware.authUser,userController.profileUserController);
router.get('/logout',authMiddleware.authUser,userController.logoutUserController);
export default router;