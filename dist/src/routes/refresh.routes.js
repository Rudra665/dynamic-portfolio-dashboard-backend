"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refresh_controller_1 = require("../controllers/refresh.controller");
const router = (0, express_1.Router)();
router.post("/", refresh_controller_1.refreshData);
exports.default = router;
//# sourceMappingURL=refresh.routes.js.map