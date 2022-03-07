import express from 'express';
import routes from './routes/books.js';

import { sessionStore } from './session/user.js';
import session from 'express-session';
const TWO_HOURS = 1000 * 60 * 60 * 2;

const app = express();



app.use( session({
    key: 'keyin',
    secret: 'my secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: TWO_HOURS,
        sameSite: true
    }
 }))

//routes
app.use(routes);

const PORT = 5000;
app.listen(PORT, ()=>{
    console.log('Server is running at port: '+ PORT)
})