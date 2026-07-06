"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quotes_controller_1 = require("../controllers/quotes.controller");
const router = (0, express_1.Router)();
router.get("/:symbol", quotes_controller_1.getQuotes);
exports.default = router;
//# sourceMappingURL=quotes.routes.js.map