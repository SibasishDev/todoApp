"use strict;";

const authValidator = require("./auth.validation");
const authModal = require("../auth/auth.modal");
const becryptService = require("../../services/bcrypt");
const jwtService = require("../../services/jwt/jwt.auth");

class authController {
  constructor() {}

  login = async (req, res, next) => {
    try {
      const { email, password } = await authValidator
        .loginSchema()
        .validateAsync(req.body);

      const [checkUserExist] = await authModal.getUserByEmail({ email });

      if (!checkUserExist) return next({ code: 404, message: "wrong email" });

      let matchPassword = await becryptService.matchPassword({
        password,
        hash: checkUserExist.password,
      });

      if (!matchPassword)
        return next({ code: 400, message: "Incorrect password" });

      const token = await jwtService.createToken({
        email: checkUserExist.email,
        firstName: checkUserExist.first_name,
        lastName: checkUserExist.last_name,
      });

      return res.status(200).json({
        code: 200,
        data: {
          id: checkUserExist.id,
          email: checkUserExist.email,
          token: token,
        },
        message: "Login successfull",
      });
    } catch (e) {
      next(e);
    }
  };

  register = async (req, res, next) => {
    try {
      const {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password,
      } = await authValidator.registerSchema().validateAsync(req.body);

      let checkUserExist = await authModal.getUserByEmail({ email });

      if (checkUserExist.length)
        return next({ code: 409, message: "Email already exists" });

      const newPasword = await becryptService.encryptPassword(password);

      let registerUser = await authModal.registerUser({
        email,
        firstName,
        lastName,
        password: newPasword,
      });
      if (!registerUser.affectedRows)
        return next({ code: 400, message: "Error occurred in inserting user" });

      return res.status(200).json({
        code: 201,
        data: {
          id: insertId,
          email: email,
        },
        message: "user registered successfully",
      });
    } catch (e) {
      next(e);
    }
  };
  
  
}

module.exports = new authController();
