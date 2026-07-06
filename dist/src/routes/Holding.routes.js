"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const holdings_controller_1 = require("../controllers/holdings.controller");
const router = (0, express_1.Router)();
router.get("/", holdings_controller_1.getHoldings);
exports.default = router;
//# sourceMappingURL=Holding.routes.js.map