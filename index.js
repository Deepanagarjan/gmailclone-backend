import express from "express"; // react style
import dotenv from "dotenv";
import connectDB from "./db/connect.db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import emailRoute from "./routes/email.route.js";

dotenv.config({});
connectDB();
const PORT = 5001;
const app = express();

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin:'https://gmailclone-frontend.vercel.app',
    credentials:true
}
app.use(cors(corsOptions));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/email", emailRoute);

app.listen(PORT, ()=>{
    console.log(`Server running at port ${PORT}`);
});











// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./db/connect.db.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import userRoute from "./routes/user.route.js";
// import emailRoute from "./routes/email.route.js";

// dotenv.config();
// connectDB();
// const PORT = process.env.PORT || 5001;
// const app = express();

// // middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// // CORS Configuration
// const corsOptions = {
//     origin: ['http://localhost:5173', 'https://your-frontend-deployment-url.com'],  // allow multiple origins
//     credentials: true,  // Allow cookies to be sent
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific methods
//     allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
// };

// app.use(cors(corsOptions));

// // routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/email", emailRoute);

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running at port ${PORT}`);
// });
