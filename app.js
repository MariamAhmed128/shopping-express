// app.js
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
// =====================
// protact
// =====================
 //1
const helmet = require('helmet')
app.use(helmet());
//2
const hpp =require('hpp')
const cors = require('cors')


app.use(hpp())
app.use(cors({
  origin : 'http://localhost:5000' ,
}))
             
//3
const ratelimit = require('express-rate-limit')
const limiter = ratelimit({
  windowMs : 15 * 60 * 1000 ,   
  max : 100 ,
  message : "Too many requests from this IP , please try again later"
})
app.use(limiter)
//4
const mongoSanitize = require('mongo-sanitize')
app.use((req , res , next )=>{
  req.body = mongoSanitize(req.body) ;
  req.query = mongoSanitize(req.query) ;
  req.params = mongoSanitize(req.params) ;
  next()  
});
// =====================
// Middleware
// =====================


app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecretkey', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } 
}));

app.use('/uploads', express.static('uploads'));

// =====================
// Routes
// =====================
const { userRouter, productRouter, orderRouter} = require('./routes');
app.use('/api/v1', userRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', orderRouter);
// app.use('/api/v1/password', passwordResetRoutes);

app.get('/', (req, res) => {
  res.status(200).send('App is working');
});

// =====================
// Test Session Route
// =====================
app.get('/test-session', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Number of views: ${req.session.views}`);
  } else {
    req.session.views = 1;
    res.send('Welcome! First visit.');
  }
});

// =====================
// Connect MongoDB
// =====================
const connectDB = require('./db');
connectDB();
// =====================
// Start Server
// =====================
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Application is running on PORT: ${port}`);
}).on('error', (err) => {
  console.error('Error starting the server:', err);
});
