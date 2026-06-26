// Google Finance uses "<TICKER>:<EXCHANGE>" e.g. "HDFCBANK:NSE" or "532174:BOM"
// Note: this is a DIFFERENT convention from Yahoo's ".NS" / ".BO" suffixes.
export function toGoogleFinanceSymbol(exchangeCode: string): string {
	const isNumericBseCode = /^\d+$/.test(exchangeCode);
	return isNumericBseCode ? `${exchangeCode}:BOM` : `${exchangeCode}:NSE`;
}
