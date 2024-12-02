const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 24 * 60 * 60 * 60 }
}));

app.use('/uploads', express.static('uploads'));

const { userRouter, productRouter, orderRouter } = require('./routes');
app.use('/api/v1', userRouter);
app.use('/api/v1', productRouter);
app.use('/api/v1', orderRouter);

app.get('/', (req, res) => {
	res.status(200).send('App is working')
});

const connectDB = require('./db');
connectDB();

const port = 5000;
app.listen(port, () => {
	console.log(`Application is running on PORT: ${port}`);
}).on('error', (err) => {
  console.error('Error starting the server:', err);
});
