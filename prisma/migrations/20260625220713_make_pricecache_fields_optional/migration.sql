-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Holding" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stockName" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "purchasePrice" REAL,
    "qty" INTEGER NOT NULL,
    "exchangeCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Holding" ("createdAt", "exchangeCode", "id", "purchasePrice", "qty", "sector", "stockName") SELECT "createdAt", "exchangeCode", "id", "purchasePrice", "qty", "sector", "stockName" FROM "Holding";
DROP TABLE "Holding";
ALTER TABLE "new_Holding" RENAME TO "Holding";
CREATE TABLE "new_PriceCache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "cmp" REAL,
    "peRatio" REAL,
    "latestEarnings" REAL,
    "marketCap" REAL,
    "lastFetchedAt" DATETIME NOT NULL
);
INSERT INTO "new_PriceCache" ("cmp", "id", "lastFetchedAt", "latestEarnings", "marketCap", "peRatio", "symbol") SELECT "cmp", "id", "lastFetchedAt", "latestEarnings", "marketCap", "peRatio", "symbol" FROM "PriceCache";
DROP TABLE "PriceCache";
ALTER TABLE "new_PriceCache" RENAME TO "PriceCache";
CREATE UNIQUE INDEX "PriceCache_symbol_key" ON "PriceCache"("symbol");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
