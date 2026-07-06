"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toGoogleFinanceSymbol = toGoogleFinanceSymbol;
// Google Finance uses "<TICKER>:<EXCHANGE>" e.g. "HDFCBANK:NSE" or "532174:BOM"
// Note: this is a DIFFERENT convention from Yahoo's ".NS" / ".BO" suffixes.
function toGoogleFinanceSymbol(exchangeCode) {
    const isNumericBseCode = /^\d+$/.test(exchangeCode);
    return isNumericBseCode ? `${exchangeCode}:BOM` : `${exchangeCode}:NSE`;
}
//# sourceMappingURL=googleSymbol.js.map