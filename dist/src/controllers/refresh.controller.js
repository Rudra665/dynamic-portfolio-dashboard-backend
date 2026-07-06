"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshData = void 0;
const prisma_1 = require("../lib/prisma");
const googleFinance_1 = require("../lib/googleFinance");
const googleSymbol_1 = require("../lib/googleSymbol");
const yahooFinance_1 = require("../lib/yahooFinance");
const yahooSymbol_1 = require("../lib/yahooSymbol");
const CACHE_TTL_MS = 15 * 1000;
const FUNDAMENTALS_TTL_MS = 60 * 60 * 1000;
const refreshData = async (req, res) => {
    try {
        const holdings = await prisma_1.prisma.holding.findMany();
        const symbols = holdings.map((holding) => holding.exchangeCode);
        const existingCache = await prisma_1.prisma.priceCache.findMany({
            where: { symbol: { in: symbols } },
        });
        const cacheMap = new Map(existingCache.map((cache) => [cache.symbol, cache]));
        await Promise.all(symbols.map(async (symbol) => {
            const cached = cacheMap.get(symbol);
            const now = Date.now();
            const needsCmpRefresh = !cached ||
                now - cached.lastFetchedAt.getTime() >= CACHE_TTL_MS;
            const needsFundamentalsRefresh = !cached ||
                now - cached.lastFetchedAt.getTime() >= FUNDAMENTALS_TTL_MS;
            let cmp = cached?.cmp ?? null;
            let peRatio = cached?.peRatio ?? null;
            let latestEarnings = cached?.latestEarnings ?? null;
            if (needsCmpRefresh) {
                const yahooSymbol = (0, yahooSymbol_1.toYahooSymbol)(symbol);
                const cmpResult = await (0, yahooFinance_1.fetchCmp)(yahooSymbol);
                cmp = cmpResult?.cmp ?? null;
            }
            if (needsFundamentalsRefresh) {
                const googleSymbol = (0, googleSymbol_1.toGoogleFinanceSymbol)(symbol);
                const fundamentalsResult = await (0, googleFinance_1.fetchFundamentals)(googleSymbol);
                peRatio = fundamentalsResult.peRatio ?? null;
                latestEarnings = fundamentalsResult.latestEarnings ?? null;
            }
            await prisma_1.prisma.priceCache.upsert({
                where: { symbol },
                update: { cmp, peRatio, latestEarnings },
                create: { symbol, cmp, peRatio, latestEarnings },
            });
        }));
        res.json({
            message: "Data refresh completed successfully.",
            refreshedSymbols: symbols,
        });
    }
    catch (error) {
        console.error("Error refreshing data:", error);
        res.status(500).json({
            error: "An error occurred while refreshing data.",
        });
    }
};
exports.refreshData = refreshData;
//# sourceMappingURL=refresh.controller.js.map