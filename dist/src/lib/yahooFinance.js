"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCmp = fetchCmp;
const yahoo_finance2_1 = __importDefault(require("yahoo-finance2"));
async function fetchCmp(cmp) {
    try {
        const yf = new yahoo_finance2_1.default({ suppressNotices: ["yahooSurvey"] });
        const quote = await yf.quote(cmp);
        return { cmp: quote.regularMarketPrice };
    }
    catch (error) {
        console.error(`Error fetching quote for ${cmp}:`, error);
        return null;
    }
}
//# sourceMappingURL=yahooFinance.js.map