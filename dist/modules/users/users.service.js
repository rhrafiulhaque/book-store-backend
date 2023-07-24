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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const users_model_1 = require("./users.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user.role) {
        user.role = 'user';
    }
    const createdUser = yield users_model_1.User.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(400, 'Failed to create user');
    }
    const _a = createdUser.toObject(), { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
    return userWithoutPassword;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_model_1.User.find().lean();
    return users;
});
const getSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findById(userId).select('-password');
    if (!user) {
        throw new ApiError_1.default(401, 'User Not Found');
    }
    return user;
});
const updateSingleUser = (userId, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findByIdAndUpdate(userId, updatedUser, { new: true });
    return user;
});
const deleteSingleUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.User.findByIdAndDelete(userId);
    return user;
});
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userExist = yield users_model_1.User.findOne({ email });
    if (!userExist) {
        throw new ApiError_1.default(404, 'User not found');
    }
    const passwordMatched = yield bcrypt_1.default.compare(password, userExist.password);
    if (!passwordMatched) {
        throw new ApiError_1.default(401, 'Invalid password');
    }
    const accessToken = jsonwebtoken_1.default.sign({
        email: userExist.email,
        name: userExist.name,
        role: userExist.role,
    }, config_1.default.jwt_secret_key, { expiresIn: config_1.default.jwt_expires });
    return accessToken;
});
exports.usersService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    loginUser,
};
