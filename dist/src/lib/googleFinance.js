"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFundamentals = fetchFundamentals;
const axios_1 = __importDefault(require("axios"));
const parse = __importStar(require("cheerio"));
async function fetchFundamentals(googleSymbol) {
    try {
        const url = `https://www.google.com/finance/beta/quote/${googleSymbol}`;
        const { data: html } = await axios_1.default.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            },
        });
        const $ = parse.load(html);
        let peRatio = null;
        let latestEarnings = null;
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
    }
    catch (error) {
        console.error(`Error fetching fundamentals for ${googleSymbol}:`, error);
        return { peRatio: null, latestEarnings: null };
    }
}
//# sourceMappingURL=googleFinance.js.map