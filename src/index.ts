import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import holdingRoutes from "./routes/Holding.routes";
import quotesRoutes from "./routes/quotes.routes";
import portfolioRoutes from "./routes/portfolio.routes";
import fundamentalsRoutes from "./routes/fundamentals.routes";
import refreshRoutes from "./routes/refresh.routes";

dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});
app.use("/api/holdings", holdingRoutes);
app.use("/api/quotes", quotesRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/fundamentals", fundamentalsRoutes);
app.use("/api/refresh", refreshRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
