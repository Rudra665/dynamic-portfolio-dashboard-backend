"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const Holding_routes_1 = __importDefault(require("./routes/Holding.routes"));
const quotes_routes_1 = __importDefault(require("./routes/quotes.routes"));
const portfolio_routes_1 = __importDefault(require("./routes/portfolio.routes"));
const fundamentals_routes_1 = __importDefault(require("./routes/fundamentals.routes"));
const refresh_routes_1 = __importDefault(require("./routes/refresh.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
const PORT = process.env.PORT || 3001;
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});
app.use("/api/holdings", Holding_routes_1.default);
app.use("/api/quotes", quotes_routes_1.default);
app.use("/api/portfolio", portfolio_routes_1.default);
app.use("/api/fundamentals", fundamentals_routes_1.default);
app.use("/api/refresh", refresh_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map