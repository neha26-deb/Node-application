import db from '../datastore/db.js';
// const db = require("../datastore/db");


export const getBooks = async (req, res, next) => {
  try{
    let offset = req.params.offset;
    let limit = req.params.limit;

     console.log('get request');
    //  const books = await db.getAllBooks();
     const books = await db.getAllBooks(offset, limit);
     const totalbooks = await db.getTotalBooks();
    //  res.status(200).json({books: books});
     res.status(200).json({totalbooks: totalbooks, books: books});
  }catch(e) {
     console.log(e);
     res.sendStatus(500);
  }
};




export const pBooks = async (req, res, next, bookId) => {
  try{
    const book = await db.getOneBook(bookId);
    req.book = book;
    next(); // go to apiRouter.get('/:employeeId')
} catch(e) {
    console.log(e);
    res.sendStatus(404);
}
};


export const getABook = async (req, res, next) => {
  res.status(200).json({book: req.book});
};



export const createBooks = async (req, res, next) => {
  try{
    console.log('post request');
    const BookName = req.body.BookName;
    const AuthorName = req.body.AuthorName;
    const bookPublisher = req.body.bookPublisher;
    const bookPublishedYear = req.body.bookPublishedYear;
    if (!BookName || !AuthorName || !bookPublisher || !bookPublishedYear) {
      return res.sendStatus(400);
   }
   const book =  await db.insertBook(BookName, AuthorName, bookPublisher, bookPublishedYear).then(insertId=>{return db.getOneBook(insertId);});
   res.json({book: book});
    
  }catch(e) {
    console.log(e);
    res.sendStatus(400);
 }
};



export const updateBooks = async (req, res, next) => {
  try{
    const BookName = req.body.BookName;
    const AuthorName = req.body.AuthorName;
    const bookPublisher = req.body.bookPublisher;
    const bookPublishedYear= req.body.bookPublishedYear;
    const bookId= req.params.bookId;


    if (!BookName || !AuthorName || !bookPublisher || !bookPublishedYear) {
            return res.sendStatus(400);
    }

    const book =  await db.updateBook(BookName, AuthorName, bookPublisher, bookPublishedYear, bookId).then(()=>{return db.getOneBook(bookId);});
    res.json({book: book});
     
} catch(e){
    console.log(e);
    res.sendStatus(400);
}
};


export const deleteBooks = async (req, res, next) => {
  try{
    const bookId = req.params.bookId;
    const response = await db.deleteBook(bookId);
    return res.sendStatus(204);
  } catch(e){
    console.log(e);
  } 
};

