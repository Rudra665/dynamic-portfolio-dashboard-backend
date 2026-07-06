export interface PortfolioRow {
    id: number;
    stockName: string;
    sector: string;
    purchasePrice: number;
    qty: number;
    exchangeCode: string;
    investment: number;
    portfolioPercent: number;
    cmp: number | null;
    presentValue: number | null;
    gainLoss: number | null;
    peRatio: number | null;
    latestEarnings: number | null;
}
export interface SectorSummary {
    sector: string;
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
}
export interface PortfolioResponse {
    rows: PortfolioRow[];
    sectorSummaries: SectorSummary[];
    totalInvestment: number;
    totalPresentValue: number;
    totalGainLoss: number;
}
//# sourceMappingURL=portfolio.d.ts.map