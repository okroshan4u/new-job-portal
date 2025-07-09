import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors";
import dotenv from "dotenv"
import connetDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config({})

const app = express();

// const _dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const corsOptions = {
//     origin: 'http://localhost:5173',
//     credentials: true
// }

// app.use(cors(corsOptions));

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))


const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute)
app.use("/api/v1/company", companyRoute)
app.use("/api/v1/job", jobRoute)
app.use("/api/v1/application", applicationRoute)


// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route for SPA
app.get('/{*splat}', (_, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});



app.listen(PORT, () => {
    connetDB();
    console.log(`Server is running ar port ${PORT}`)
})
