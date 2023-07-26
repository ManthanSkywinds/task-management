import { Router } from "express";
import { authController } from "./authController";
import { validator } from "../../validate";
import { signupModel } from "./authValidator/signup";
import { loginModel } from "./authValidator/login";
import { AuthMiddleware } from "./authMiddleware";

const route: Router = Router();
const authC = new authController();
const authMiddleware = new AuthMiddleware();
const V: validator = new validator();

//TODO: add middleware
route.post(
  "/signup",
  V.validate(signupModel),
  authMiddleware.isUserExist,
  authC.signup
);
route.post("/login", V.validate(loginModel), authC.login);
export const authRoute: Router = route;
