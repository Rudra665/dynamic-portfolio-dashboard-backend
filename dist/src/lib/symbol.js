"use strict";
// Yahoo Finance needs an exchange suffix to resolve a symbol correctly.
// Our exchangeCode column has two shapes:
//   - Real NSE tickers, e.g. "HDFCBANK"  -> alphabetic
//   - Raw BSE scrip codes, e.g. "532174" -> purely numeric
// We detect which one we have and append the right suffix.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toYahooSymbol = toYahooSymbol;
function toYahooSymbol(exchangeCode) {
    const isNumericBseCode = /^\d+$/.test(exchangeCode);
    return isNumericBseCode ? `${exchangeCode}.BO` : `${exchangeCode}.NS`;
}
//# sourceMappingURL=symbol.js.map