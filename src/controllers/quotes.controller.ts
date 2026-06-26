import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { fetchCmp } from "../lib/yahooFinance";
import { toYahooSymbol } from "../lib/yahooSymbol";

const CACHE_TTL_MS = 5 * 1000;

export const getQuotes = async (req: Request, res: Response) => {
	const symbolParam = req.params.symbol;
	if (!symbolParam || Array.isArray(symbolParam)) {
		return res.status(400).json({ error: "Invalid symbol" });
	}
	const symbol = symbolParam;

	try {
		const cached = await prisma.priceCache.findUnique({
			where: { symbol },
		});

		const isFresh =
			cached &&
			Date.now() - cached.lastFetchedAt.getTime() < CACHE_TTL_MS;

		if (isFresh) {
			return res.json({ symbol, cmp: cached.cmp, source: "cache" });
		}

		// cache is stale or doesn't exist, fetch new data
		const yahooSymbol = toYahooSymbol(symbol);
		const result = await fetchCmp(yahooSymbol);
		const cmp = result?.cmp ?? null;

		const updated = await prisma.priceCache.upsert({
			where: { symbol },
			update: { cmp },
			create: { symbol, cmp },
		});

		res.json({ symbol, cmp: updated.cmp, source: "live" });
	} catch (error) {
		console.error(`Error fetching quote for ${symbol}:`, error);
		res.status(500).json({
			error: "An error occurred while fetching the quote.",
		});
	}
};
