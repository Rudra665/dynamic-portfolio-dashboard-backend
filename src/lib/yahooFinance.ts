import YahooFinance from "yahoo-finance2";
import { YahooQuoteResult } from "../types/yahooFinance";

export async function fetchCmp(cmp: string): Promise<YahooQuoteResult | null> {
	try {
		const yf = new YahooFinance({ suppressNotices: ["yahooSurvey"] });
		const quote = await yf.quote(cmp);
		return { cmp: quote.regularMarketPrice };
	} catch (error) {
		console.error(`Error fetching quote for ${cmp}:`, error);
		return null;
	}
}
