import express from  'express';
import bodyParser from 'body-parser'; 
import { getBooks, pBooks, createBooks, getABook, deleteBooks, updateBooks } from '../controllers/books.js';
import { signupValidation, loginValidation } from '../authentication/validator.js';
import { signUpUser, loginUser } from '../authentication/user.js';
import { logout } from '../authentication/user.js';
const router = express.Router(); // create new instance of router object




//initialise body-parser middleware 
router.use(bodyParser.json());
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))



router.get('/', getBooks);

router.param('bookId', pBooks);

router.post('/', createBooks);

router.get('/:bookId', getABook);

router.delete('/:bookId', deleteBooks);

router.patch('/:bookId', updateBooks);

router.post('/register', signupValidation, signUpUser);

router.post('/login', loginValidation, loginUser);

router.post('/logout', logout);



export default router;

