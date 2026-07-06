"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuotes = void 0;
const prisma_1 = require("../lib/prisma");
const yahooFinance_1 = require("../lib/yahooFinance");
const yahooSymbol_1 = require("../lib/yahooSymbol");
const CACHE_TTL_MS = 5 * 1000;
const getQuotes = async (req, res) => {
    const symbolParam = req.params.symbol;
    if (!symbolParam || Array.isArray(symbolParam)) {
        return res.status(400).json({ error: "Invalid symbol" });
    }
    const symbol = symbolParam;
    try {
        const cached = await prisma_1.prisma.priceCache.findUnique({
            where: { symbol },
        });
        const isFresh = cached &&
            Date.now() - cached.lastFetchedAt.getTime() < CACHE_TTL_MS;
        if (isFresh) {
            return res.json({ symbol, cmp: cached.cmp, source: "cache" });
        }
        // cache is stale or doesn't exist, fetch new data
        const yahooSymbol = (0, yahooSymbol_1.toYahooSymbol)(symbol);
        const result = await (0, yahooFinance_1.fetchCmp)(yahooSymbol);
        const cmp = result?.cmp ?? null;
        const updated = await prisma_1.prisma.priceCache.upsert({
            where: { symbol },
            update: { cmp },
            create: { symbol, cmp },
        });
        res.json({ symbol, cmp: updated.cmp, source: "live" });
    }
    catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        res.status(500).json({
            error: "An error occurred while fetching the quote.",
        });
    }
};
exports.getQuotes = getQuotes;
//# sourceMappingURL=quotes.controller.js.map