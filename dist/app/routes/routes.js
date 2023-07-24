"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("../../modules/book/book.routes");
const users_route_1 = require("../../modules/users/users.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/books',
        route: book_routes_1.BookRoutes,
    },
    {
        path: '/users',
        route: users_route_1.UserRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
