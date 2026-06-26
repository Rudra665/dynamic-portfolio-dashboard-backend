import { request, response } from "express";
import { prisma } from "../lib/prisma";

export const getHoldings = async (
	req: typeof request,
	res: typeof response,
) => {
	try {
		const holdings = await prisma.holding.findMany({
			orderBy: { id: "asc" },
		});

		const withInvestment = holdings.map(
			(
				holding,
			): {
				investment: number;
				id: number;
				stockName: string;
				sector: string;
				purchasePrice: number | null;
				qty: number;
				exchangeCode: string;
				createdAt: Date;
			} => ({
				...holding,
				investment: (holding.purchasePrice ?? 0) * holding.qty,
			}),
		);

		const totalInvestment = withInvestment.reduce(
			(sum: number, holding: { investment: number }) =>
				sum + holding.investment,
			0,
		);

		const result = withInvestment.map(
			(holding: { investment: number }) => ({
				...holding,
				portfolioPercent:
					totalInvestment > 0
						? (holding.investment / totalInvestment) * 100
						: 0,
			}),
		);

		res.json({
			totalInvestment,
			holdings: result,
		});
	} catch (error) {
		console.error("Error fetching holdings:", error);
		res.status(500).json({
			error: "An error occurred while fetching holdings.",
		});
	}
};
