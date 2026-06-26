// Shape returned by /api/holdings — the raw DB row plus computed fields
// that depend on the *whole* portfolio (so they can't live in the DB itself).

export interface HoldingResponse {
	id: number;
	stockName: string;
	sector: string;
	purchasePrice: number;
	qty: number;
	exchangeCode: string;
	investment: number; // purchasePrice * qty
	portfolioPercent: number; // investment / totalInvestment * 100
}
