"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const holdings_1 = require("../prisma/data/holdings");
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const client_1 = require("../src/generated/prisma/client");
const url = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3({ url });
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log("Seeding database with holding data...");
    await prisma.holding.deleteMany();
    for (const h of holdings_1.holdings) {
        await prisma.holding.create({
            data: {
                stockName: h.stockName,
                sector: h.sector,
                purchasePrice: h.purchasePrice,
                qty: h.qty,
                exchangeCode: h.exchangeCode,
            },
        });
    }
    console.log("Database seeding completed.");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
});
//# sourceMappingURL=seed.js.map