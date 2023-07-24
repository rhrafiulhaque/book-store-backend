"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const users_service_1 = require("./users.service");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = __rest(req.body, []);
        const result = yield users_service_1.usersService.createUser(userData);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_service_1.usersService.getAllUsers();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Users retrieved successfully',
            data: users,
        });
    }
    catch (err) {
        next(err);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield users_service_1.usersService.getSingleUser(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User retrieved successfully',
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedUser = req.body;
        const user = yield users_service_1.usersService.updateSingleUser(id, updatedUser);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User updated successfully',
            data: user,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield users_service_1.usersService.deleteSingleUser(id);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User deleted successfully',
            data: deletedUser,
        });
    }
    catch (err) {
        next(err);
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const accessToken = yield users_service_1.usersService.loginUser(email, password);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'User logged in successfully',
            data: {
                accessToken,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    loginUser,
    // getMyProfile,
    // updateMyProfile,
};
