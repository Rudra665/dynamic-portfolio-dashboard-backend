import axios from "axios";
import * as parse from "cheerio";
import { GoogleFinanceQuote } from "../types/googleFinance";

export async function fetchFundamentals(
	googleSymbol: string,
): Promise<GoogleFinanceQuote> {
	try {
		const url = `https://www.google.com/finance/beta/quote/${googleSymbol}`;
		const { data: html } = await axios.get(url, {
			headers: {
				"User-Agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
			},
		});

		const $ = parse.load(html);

		let peRatio: number | null = null;
		let latestEarnings: number | null = null;

		// Extract P/E ratio
		$("div.KxsRFb").each((_, elem) => {
			const label = $(elem).find("div.SwQK7").text().trim();
			const value = $(elem).find("div.dO6ijd").text().trim();

			if (label === "P/E ratio") {
				const parsedValue = parseFloat(value.replace(/,/g, ""));
				peRatio = isNaN(parsedValue) ? null : parsedValue;
			}

			if (label === "EPS") {
				const parsedValue = parseFloat(value.replace(/[^0-9.-]/g, ""));
				latestEarnings = isNaN(parsedValue) ? null : parsedValue;
			}
		});

		return { peRatio, latestEarnings };
	} catch (error) {
		console.error(
			`Error fetching fundamentals for ${googleSymbol}:`,
			error,
		);
		return { peRatio: null, latestEarnings: null };
	}
}
