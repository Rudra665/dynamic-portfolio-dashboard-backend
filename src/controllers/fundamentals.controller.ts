import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { fetchFundamentals } from "../lib/googleFinance";
import { toGoogleFinanceSymbol } from "../lib/googleSymbol";

const CACHE_TTL_MS = 60 * 60 * 1000;
// const CACHE_TTL_MS = 1 * 1000;

export const getFundamentals = async (req: Request, res: Response) => {
	const { symbolParam } = req.params;
	if (!symbolParam || Array.isArray(symbolParam)) {
		return res.status(400).json({ error: "Invalid symbol" });
	}

	try {
		const cached = await prisma.priceCache.findUnique({
			where: { symbol: symbolParam },
		});

		const isFresh =
			cached &&
			Date.now() - cached.lastFetchedAt.getTime() < CACHE_TTL_MS;

		if (isFresh) {
			return res.json({
				symbol: symbolParam,
				peRatio: cached.peRatio,
				latestEarnings: cached.latestEarnings,
				source: "cache",
			});
		}

		const googleSymbol = toGoogleFinanceSymbol(symbolParam);
		const { peRatio, latestEarnings } =
			await fetchFundamentals(googleSymbol);

		const updated = await prisma.priceCache.upsert({
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
	} catch (error) {
		console.error(`Error fetching fundamentals for ${symbolParam}:`, error);
		res.status(500).json({
			error: "An error occurred while fetching the fundamentals.",
		});
	}
};
