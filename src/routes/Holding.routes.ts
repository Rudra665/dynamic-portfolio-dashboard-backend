import { Router } from "express";
import { getHoldings } from "../controllers/holdings.controller";

const router = Router();

router.get("/", getHoldings);

export default router;
