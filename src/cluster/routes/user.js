import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../core/helpers/param-validation';
import userController from '../../core/controllers/user';
import auth from '../../core/controllers/auth';

const router = express.Router();

router.route('/')
    .get(auth.isValidToken, userController.getUsers)
    .post(auth.isValidToken, validate(paramValidation.user), userController.postUser);

router.route('/:name')
    .get(auth.isValidToken, userController.getUser)
    .put(auth.isValidToken, validate(paramValidation.user), userController.updateUser)
    .delete(auth.isValidToken, userController.removeUser);

export default router;