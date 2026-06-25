import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
