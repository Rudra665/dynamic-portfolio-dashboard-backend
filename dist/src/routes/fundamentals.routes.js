"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fundamentals_controller_1 = require("../controllers/fundamentals.controller");
const router = (0, express_1.Router)();
router.get("/:symbolParam", fundamentals_controller_1.getFundamentals);
exports.default = router;
//# sourceMappingURL=fundamentals.routes.js.map