// Raw holdings data extracted from the portfolio Excel sheet.
// exchangeCode is whatever was in the NSE/BSE column — some are real
// NSE tickers (e.g. "HDFCBANK"), some are raw BSE scrip codes (e.g. "532174").
// We'll normalize these into proper Yahoo Finance symbols later (e.g. add .NS / .BO suffix).

export interface RawHolding {
	stockName: string;
	sector: string;
	purchasePrice: number;
	qty: number;
	exchangeCode: string;
}

export const holdings: RawHolding[] = [
	// Financial Sector
	{
		stockName: "HDFC Bank",
		sector: "Financial Sector",
		purchasePrice: 1490,
		qty: 50,
		exchangeCode: "HDFCBANK",
	},
	{
		stockName: "Bajaj Finance",
		sector: "Financial Sector",
		purchasePrice: 6466,
		qty: 15,
		exchangeCode: "BAJFINANCE",
	},
	{
		stockName: "ICICI Bank",
		sector: "Financial Sector",
		purchasePrice: 780,
		qty: 84,
		exchangeCode: "532174",
	},
	{
		stockName: "Bajaj Housing",
		sector: "Financial Sector",
		purchasePrice: 130,
		qty: 504,
		exchangeCode: "544252",
	},
	{
		stockName: "Savani Financials",
		sector: "Financial Sector",
		purchasePrice: 24,
		qty: 1080,
		exchangeCode: "511577",
	},

	// Tech Sector
	{
		stockName: "Affle India",
		sector: "Tech Sector",
		purchasePrice: 1151,
		qty: 50,
		exchangeCode: "AFFLE",
	},
	{
		stockName: "LTI Mindtree",
		sector: "Tech Sector",
		purchasePrice: 4775,
		qty: 16,
		exchangeCode: "LTIM",
	},
	{
		stockName: "KPIT Tech",
		sector: "Tech Sector",
		purchasePrice: 672,
		qty: 61,
		exchangeCode: "542651",
	},
	{
		stockName: "Tata Tech",
		sector: "Tech Sector",
		purchasePrice: 1072,
		qty: 63,
		exchangeCode: "544028",
	},
	{
		stockName: "BLS E-Services",
		sector: "Tech Sector",
		purchasePrice: 232,
		qty: 191,
		exchangeCode: "544107",
	},
	{
		stockName: "Tanla",
		sector: "Tech Sector",
		purchasePrice: 1134,
		qty: 45,
		exchangeCode: "532790",
	},

	// Consumer
	{
		stockName: "Dmart",
		sector: "Consumer",
		purchasePrice: 3777,
		qty: 27,
		exchangeCode: "DMART",
	},
	{
		stockName: "Tata Consumer",
		sector: "Consumer",
		purchasePrice: 845,
		qty: 90,
		exchangeCode: "532540",
	},
	{
		stockName: "Pidilite",
		sector: "Consumer",
		purchasePrice: 2376,
		qty: 36,
		exchangeCode: "500331",
	},

	// Power
	{
		stockName: "Tata Power",
		sector: "Power",
		purchasePrice: 224,
		qty: 225,
		exchangeCode: "500400",
	},
	{
		stockName: "KPI Green",
		sector: "Power",
		purchasePrice: 875,
		qty: 50,
		exchangeCode: "542323",
	},
	{
		stockName: "Suzlon",
		sector: "Power",
		purchasePrice: 44,
		qty: 450,
		exchangeCode: "532667",
	},
	{
		stockName: "Gensol",
		sector: "Power",
		purchasePrice: 998,
		qty: 45,
		exchangeCode: "542851",
	},

	// Pipe Sector
	{
		stockName: "Hariom Pipes",
		sector: "Pipe Sector",
		purchasePrice: 580,
		qty: 60,
		exchangeCode: "543517",
	},
	{
		stockName: "Astral",
		sector: "Pipe Sector",
		purchasePrice: 1517,
		qty: 56,
		exchangeCode: "ASTRAL",
	},
	{
		stockName: "Polycab",
		sector: "Pipe Sector",
		purchasePrice: 2818,
		qty: 28,
		exchangeCode: "542652",
	},

	// Others
	{
		stockName: "Clean Science",
		sector: "Others",
		purchasePrice: 1610,
		qty: 32,
		exchangeCode: "543318",
	},
	{
		stockName: "Deepak Nitrite",
		sector: "Others",
		purchasePrice: 2248,
		qty: 27,
		exchangeCode: "506401",
	},
	{
		stockName: "Fine Organic",
		sector: "Others",
		purchasePrice: 4284,
		qty: 16,
		exchangeCode: "541557",
	},
	{
		stockName: "Gravita",
		sector: "Others",
		purchasePrice: 2037,
		qty: 8,
		exchangeCode: "533282",
	},
	{
		stockName: "SBI Life",
		sector: "Others",
		purchasePrice: 1197,
		qty: 49,
		exchangeCode: "540719",
	},
];
