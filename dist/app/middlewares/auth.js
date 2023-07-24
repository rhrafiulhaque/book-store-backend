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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const auth = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Unauthorized: Access token not found',
            });
        }
        let verifiedUser = null;
        try {
            verifiedUser = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret_key);
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Invalid Access token',
            });
        }
        //   req.user = verifiedUser;
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'Forbidden',
            });
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
