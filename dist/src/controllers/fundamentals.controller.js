"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFundamentals = void 0;
const prisma_1 = require("../lib/prisma");
const googleFinance_1 = require("../lib/googleFinance");
const googleSymbol_1 = require("../lib/googleSymbol");
const CACHE_TTL_MS = 60 * 60 * 1000;
// const CACHE_TTL_MS = 1 * 1000;
const getFundamentals = async (req, res) => {
    const { symbolParam } = req.params;
    if (!symbolParam || Array.isArray(symbolParam)) {
        return res.status(400).json({ error: "Invalid symbol" });
    }
    try {
        const cached = await prisma_1.prisma.priceCache.findUnique({
            where: { symbol: symbolParam },
        });
        const isFresh = cached &&
            Date.now() - cached.lastFetchedAt.getTime() < CACHE_TTL_MS;
        if (isFresh) {
            return res.json({
                symbol: symbolParam,
                peRatio: cached.peRatio,
                latestEarnings: cached.latestEarnings,
                source: "cache",
            });
        }
        const googleSymbol = (0, googleSymbol_1.toGoogleFinanceSymbol)(symbolParam);
        const { peRatio, latestEarnings } = await (0, googleFinance_1.fetchFundamentals)(googleSymbol);
        const updated = await prisma_1.prisma.priceCache.upsert({
            where: { symbol: symbolParam },
            update: { peRatio, latestEarnings },
            create: { symbol: symbolParam, peRatio, latestEarnings },
        });
        res.json({
            symbol: symbolParam,
            peRatio: updated.peRatio,
            latestEarnings: updated.latestEarnings,
            source: "live",
        });
    }
    catch (error) {
        console.error(`Error fetching fundamentals for ${symbolParam}:`, error);
        res.status(500).json({
            error: "An error occurred while fetching the fundamentals.",
        });
    }
};
exports.getFundamentals = getFundamentals;
//# sourceMappingURL=fundamentals.controller.js.map