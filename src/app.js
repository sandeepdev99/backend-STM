import express from "express"
import cookieParser from "cookie-parser"

import cors from "cors"

const app = express();
app.use(cors({
    origin: "https://stmfrontend.vercel.app",
    Credential: true}
  ))


app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

//cookie of browser
app.use(cookieParser())


//routes immport
import userRouter from "./routes/auth.route.js"

//routes declaration
// app.get - since router is imported we use middleware

app.use("/api/v1/user", userRouter);


import productRoutes from './routes/product.route.js';

app.use('/api/v1/products', productRoutes);

/*import authRoutes from './routes/auth.routes.js';
app.use('/api/auth', authRoutes);*/
import orderRoutes from './routes/order.route.js';

app.use('/api/v1/orders', orderRoutes);


import { protect } from './middlewares/auth.middleware.js';

app.get('/api/v1/protected', protect, (req, res) => {
  res.json({
    message: 'Access granted',
    user: req.user,
  });
});

import paymentRoutes from './routes/payment.route.js';

app.use('/api/v1/payments', paymentRoutes);


// http://localhost:8000/user/
// register


import errorHandler from './middlewares/error.middleware.js';

app.use(errorHandler);

export default app