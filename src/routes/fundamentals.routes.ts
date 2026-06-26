import { Router } from "express";
import { getFundamentals } from "../controllers/fundamentals.controller";

const router = Router();

router.get("/:symbolParam", getFundamentals);

export default router;
