import "dotenv/config";
import { holdings } from "../prisma/data/holdings";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });
async function main() {
	console.log("Seeding database with holding data...");

	await prisma.holding.deleteMany();

	for (const h of holdings) {
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
