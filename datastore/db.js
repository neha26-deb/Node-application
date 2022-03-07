import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '12345',
  database: 'nehadb1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});



let db = {};
 

db.getAllBooks = (offset, limit) =>{
    return new Promise((resolve, reject)=>{
            pool.query('SELECT * FROM books ORDER BY ID LIMIT ?, ?', [+offset, +limit] ,(error, books)=>{
            if(error){
                return reject(error);
            }
            return resolve(books);
        });
    });
};
db.getTotalBooks = () =>{
    return new Promise((resolve, reject)=>{   
            pool.query('SELECT COUNT(*) AS total FROM books' ,(error, books)=>{
            if(error){
                return reject(error);
            }
            return resolve(books);
        });
    });
};
 
db.getOneBook = (id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM books WHERE id= ?', [id], (error, book)=>{
            if(error){
                return reject(error);
            }
            return resolve(book);
        });
    });
};


db.insertBook = (BookName, AuthorName, bookPublisher, bookPublishedYear) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO books (BookName, AuthorName, bookPublisher, bookPublishedYear) VALUES (?, ?, ?, ?)', [BookName, AuthorName, bookPublisher, bookPublishedYear], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};
 
 
db.updateBook = (BookName, AuthorName, bookPublisher, bookPublishedYear, id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE books SET BookName = ?, AuthorName= ?, bookPublisher= ?, bookPublishedYear= ? WHERE id = ?', [BookName, AuthorName, bookPublisher, bookPublishedYear, id], (error)=>{
            if(error){
                return reject(error);
            }
             
              return resolve();
        });
    });
};

db.deleteBook = (id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('DELETE FROM books WHERE id = ?', [id], (error)=>{
            if(error){
                return reject(error);
            }
              return resolve();
         
        });
    });
};

db.getOneUser = (email) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM user WHERE email= ?', [email], (error, user)=>{
            if(error){
                return reject(error);
            }
            return resolve(user);
        });
    });
};

db.emailcheck = (email) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM user WHERE email = ?', [email], (error,user)=>{
            if(error){
                return reject(error);
            }
              return resolve(user);
         
        });
    });
};

db.insertUser = (name, role, email, password) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO user (name, role, email, password) VALUES (?, ?, ?, ?)', [name, role, email, password], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
}; 

export default db;

