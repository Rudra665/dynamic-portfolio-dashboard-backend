"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHoldings = void 0;
const prisma_1 = require("../lib/prisma");
const getHoldings = async (req, res) => {
    try {
        const holdings = await prisma_1.prisma.holding.findMany({
            orderBy: { id: "asc" },
        });
        const withInvestment = holdings.map((holding) => ({
            ...holding,
            investment: (holding.purchasePrice ?? 0) * holding.qty,
        }));
        const totalInvestment = withInvestment.reduce((sum, holding) => sum + holding.investment, 0);
        const result = withInvestment.map((holding) => ({
            ...holding,
            portfolioPercent: totalInvestment > 0
                ? (holding.investment / totalInvestment) * 100
                : 0,
        }));
        res.json({
            totalInvestment,
            holdings: result,
        });
    }
    catch (error) {
        console.error("Error fetching holdings:", error);
        res.status(500).json({
            error: "An error occurred while fetching holdings.",
        });
    }
};
exports.getHoldings = getHoldings;
//# sourceMappingURL=holdings.controller.js.map