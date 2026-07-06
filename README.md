# Portfolio Dashboard — Backend

Node.js + Express + TypeScript backend that serves portfolio holdings, fetches live
CMP from Yahoo Finance, P/E Ratio & EPS from Google Finance, and exposes an
aggregated portfolio endpoint consumed by the Next.js frontend.

Data is persisted via Prisma ORM on SQLite.

---

## Prerequisites

- Node.js 18+
- npm

---

## 1. Install dependencies

```bash
cd portfolio-backend
npm install
```

## 2. Configure environment variables

Create a `.env` file in the project root:

```
PORT=3001
DATABASE_URL="file:./dev.db"
```

> The backend runs on **port 3001**. Make sure nothing else on your machine is
> already bound to that port before starting the server.

## 3. Set up the database

Run the initial migration to create the SQLite database and tables:

```bash
npx prisma migrate dev --name init
```

Seed the `Holding` table with the actual portfolio data:

```bash
npx prisma db seed
```

You can re-run the seed command any time after editing
`prisma/data/holdings.ts` — it clears and re-inserts holdings, so it's safe
to run repeatedly.

To visually inspect the database at any point:

```bash
npx prisma studio
```

This opens a browser UI at `http://localhost:51212/`.

## 4. Run the server

```bash
npm run dev
```

### Production setup + build

When you want to prepare the database and produce the production build in one go, run:

```bash
npm run build:prod
```

The server starts on `http://localhost:3001`. Confirm it's running:

```bash
curl http://localhost:3001/health
# {"status":"ok"}
```

---

## Usage — API Endpoints

| Method | Endpoint                    | Purpose                                                                  |
| ------ | --------------------------- | ------------------------------------------------------------------------ |
| `GET`  | `/health`                   | Basic server health check                                                |
| `GET`  | `/api/holdings`             | Static holdings + computed Investment & Portfolio %                      |
| `GET`  | `/api/quotes/:symbol`       | Fetch/cache live CMP for **one** symbol (Yahoo Finance)                  |
| `GET`  | `/api/fundamentals/:symbol` | Fetch/cache P/E Ratio & EPS for **one** symbol (Google Finance)          |
| `POST` | `/api/refresh`              | Batch-refresh CMP + fundamentals for **all** holdings in parallel        |
| `GET`  | `/api/portfolio`            | Aggregated view: holdings + cached prices + Gain/Loss + sector summaries |

**Typical flow used by the frontend:**

```bash
curl -X POST http://localhost:3001/api/refresh   # refresh the cache
curl http://localhost:3001/api/portfolio          # read the aggregated result
```

`/api/quotes/:symbol` and `/api/fundamentals/:symbol` are diagnostic
endpoints for isolating per-symbol issues during debugging — the live
dashboard itself only calls `/api/refresh` and `/api/portfolio`.

> **Note on CMP during weekends/after-hours:** NSE/BSE trade Mon–Fri,
> 9:15 AM–3:30 PM IST. Outside those hours, Yahoo Finance returns the
> last closing price, which won't change between refreshes — this is
> expected exchange behavior, not an application bug.

---

## Folder Structure

```
portfolio-backend/
├── prisma/
│   ├── schema.prisma          # Holding + PriceCache models
│   ├── seed.ts                # Seed script — populates Holding table
│   └── data/
│       └── holdings.ts        # Raw holdings data (source of truth for seeding)
│
├── src/
│   ├── index.ts                       # Express app entry point, route mounting
│   │
│   ├── controllers/
│   │   ├── holdings.controller.ts      # GET /api/holdings logic
│   │   ├── quotes.controller.ts        # GET /api/quotes/:symbol — CMP cache + fetch
│   │   ├── fundamentals.controller.ts  # GET /api/fundamentals/:symbol — P/E + EPS
│   │   ├── portfolio.controller.ts     # GET /api/portfolio — aggregation logic
│   │   └── refresh.controller.ts       # POST /api/refresh — batch parallel refresh
│   │
│   ├── routes/
│   │   ├── holdings.routes.ts
│   │   ├── quotes.routes.ts
│   │   ├── fundamentals.routes.ts
│   │   ├── portfolio.routes.ts
│   │   └── refresh.routes.ts
│   │
│   ├── lib/
│   │   ├── prisma.ts           # Shared PrismaClient instance
│   │   ├── yahooFinance.ts     # fetchCmp() — wraps yahoo-finance2, includes
│   │   │                       #   a plausibility guard against malformed data
│   │   ├── googleFinance.ts    # fetchFundamentals() — Cheerio scraper for P/E + EPS
│   │   └── yahooSymbol.ts      # toYahooSymbol() / toGoogleFinanceSymbol() —
│   │                           #   exchange-suffix mapping (NSE/BSE conventions)
│   │
│   └── types/
│       ├── holding.ts          # HoldingResponse shape
│       ├── portfolio.ts        # PortfolioRow, SectorSummary, PortfolioResponse
│       └── yahooFinance.ts     # YahooQuoteResult shape
│       └── googleFinance.ts    # GoogleQuoteResult shape
├── .env
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

---

## Key Design Notes

- **Static vs. live data are kept in separate tables.** `Holding` (purchase
  price, qty, sector) almost never changes; `PriceCache` (CMP, P/E, EPS)
  refreshes constantly. Keeping them separate means a flaky external API
  response never corrupts your real portfolio data.
- **Per-field cache TTLs.** CMP refreshes every 15s; P/E & EPS refresh
  hourly, since fundamentals change far less often than price — this
  avoids unnecessarily hammering Google Finance on every poll cycle.
- **Data plausibility guard on CMP.** Yahoo Finance occasionally returns
  corrupted or misclassified data for thinly-traded BSE symbols (e.g. a
  stale entry resolved as a different instrument type). `fetchCmp`
  rejects implausible values rather than trusting them blindly.
