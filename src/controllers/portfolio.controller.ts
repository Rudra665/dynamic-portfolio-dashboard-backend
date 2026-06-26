import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
	PortfolioRow,
	SectorSummary,
	PortfolioResponse,
} from "../types/portfolio";

export const getPortfolio = async (req: Request, res: Response) => {
	try {
		const holdings = await prisma.holding.findMany({
			orderBy: { id: "asc" },
		});

		const symbols = holdings.map((holding) => holding.exchangeCode);
		const prices = await prisma.priceCache.findMany({
			where: { symbol: { in: symbols } },
		});

		const priceMap = new Map(prices.map((price) => [price.symbol, price]));

		const totalInvestment = holdings.reduce((sum, holding) => {
			const investment = (holding.purchasePrice ?? 0) * holding.qty;
			return sum + investment;
		}, 0);

		const rows: PortfolioRow[] = holdings.map((holding) => {
			const investment = (holding.purchasePrice ?? 0) * holding.qty;
			const price = priceMap.get(holding.exchangeCode);
			const cmp = price?.cmp ?? null;
			const presentValue = cmp !== null ? cmp * holding.qty : null;
			const gainLoss =
				presentValue !== null ? presentValue - investment : null;
			const portfolioPercent =
				totalInvestment > 0 ? (investment / totalInvestment) * 100 : 0;
			return {
				id: holding.id,
				stockName: holding.stockName,
				sector: holding.sector,
				purchasePrice: holding.purchasePrice ?? 0,
				qty: holding.qty,
				exchangeCode: holding.exchangeCode,
				investment,
				portfolioPercent,
				totalInvestment,
				cmp,
				presentValue,
				gainLoss,
				peRatio: price?.peRatio ?? null,
				latestEarnings: price?.latestEarnings ?? null,
			};
		});

		const sectorMap = new Map<string, SectorSummary>();
		for (const row of rows) {
			const existing = sectorMap.get(row.sector) ?? {
				sector: row.sector,
				totalInvestment: 0,
				totalPresentValue: 0,
				totalGainLoss: 0,
			};

			existing.totalInvestment += row.investment;
			existing.totalPresentValue += row.presentValue ?? 0;
			existing.totalGainLoss += row.gainLoss ?? 0;

			sectorMap.set(row.sector, existing);
		}

		const totalPresentValue = rows.reduce(
			(sum, row) => sum + (row.presentValue ?? 0),
			0,
		);

		const response: PortfolioResponse = {
			rows,
			sectorSummaries: Array.from(sectorMap.values()),
			totalInvestment,
			totalPresentValue,
			totalGainLoss: totalPresentValue - totalInvestment,
		};

		res.json({ response });
	} catch (error) {
		console.error("Error fetching portfolio:", error);
		res.status(500).json({
			error: "An error occurred while fetching portfolio.",
		});
	}
};
