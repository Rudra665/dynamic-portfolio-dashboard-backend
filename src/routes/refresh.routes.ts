import { Router } from "express";
import { refreshData } from "../controllers/refresh.controller";

const router = Router();

router.post("/", refreshData);

export default router;
