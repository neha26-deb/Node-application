import express from  'express';
import bodyParser from 'body-parser'; 
import { getBooks, pBooks, createBooks, getABook, deleteBooks, updateBooks } from '../controllers/books.js';
import { signupValidation, loginValidation } from '../authentication/validator.js';
import { signUpUser, loginUser, logout } from '../authentication/user.js';
const router = express.Router(); // create new instance of router object

import cookieParser from 'cookie-parser';
import { verifyToken } from '../authentication/user.js';


//initialise body-parser middleware 
router.use(bodyParser.json());
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

router.use(cookieParser());


// router.get('/', getBooks);
router.get('/:offset/:limit', getBooks);

router.param('bookId', pBooks);

router.post('/', verifyToken, createBooks);

router.get('/:bookId', getABook);

router.delete('/:bookId', verifyToken, deleteBooks);

router.patch('/:bookId', verifyToken, updateBooks);

router.post('/register', signupValidation, signUpUser);

router.post('/login', loginValidation, loginUser);

router.post('/logout', logout);


export default router;

