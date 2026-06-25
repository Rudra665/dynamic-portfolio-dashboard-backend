-- CreateTable
CREATE TABLE "Holding" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stockName" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "purchasePrice" REAL NOT NULL,
    "qty" INTEGER NOT NULL,
    "exchangeCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PriceCache" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "cmp" REAL NOT NULL,
    "peRatio" REAL NOT NULL,
    "latestEarnings" REAL NOT NULL,
    "marketCap" REAL NOT NULL,
    "lastFetchedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PriceCache_symbol_key" ON "PriceCache"("symbol");
