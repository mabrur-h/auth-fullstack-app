import Joi from "joi";

export default class UsersValidation {
  static async UsersLoginValidation(data) {
    return Joi.object({
      user_login: Joi.string()
        .pattern(new RegExp(/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/))
        .required()
        .error(new Error("Username is invalid!")),
      user_password: Joi.string()
        .required()
    }).validateAsync(data)
  }
}