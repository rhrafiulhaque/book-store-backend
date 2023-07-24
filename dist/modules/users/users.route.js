"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.post('/create-user', users_controller_1.UserController.createUser);
router.get('/', users_controller_1.UserController.getAllUsers);
router.get('/:id', users_controller_1.UserController.getSingleUser);
router.patch('/:id', users_controller_1.UserController.updateSingleUser);
router.post('/login-user', users_controller_1.UserController.loginUser);
exports.UserRoutes = router;
