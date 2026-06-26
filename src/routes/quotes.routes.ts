import { Router } from "express";
import { getQuotes } from "../controllers/quotes.controller";

const router = Router();

router.get("/:symbol", getQuotes);

export default router;
