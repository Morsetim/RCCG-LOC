import express from 'express';
import UsersController from '../controllers/userController';
import userValidator from '../middlewares/userValidation';
import userController from '../controllers/userController';


const router = express.Router();
router.route('/signUp/auth')
.post(userValidator.signUp, UsersController.signUp)
router.route('/signIn/auth')
.post(userValidator.signIn, userController.signIn)


export default router;