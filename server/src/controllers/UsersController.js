import UsersValidation from "../validations/UsersValidation.js";
import {signJwtToken} from "../modules/jwt.js";
import {compareHash} from "../modules/bcypt.js";

export default class UsersController {
  static async UserLoginAccount(req, res, next) {
    try {
      const { user_login } = await UsersValidation.UsersLoginValidation(
        req.body
      )

      const { user_password } = await req.body

      const userAgent = req.headers['user-agent'];
      const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

      if (!(userAgent && ipAddress))
        throw new res.error(400, "Invalid device!")

      // find user from db
      const user = await req.db.users.findOne({
        where: {
          user_login
        }
      })

      const passwordIsCorrect = await compareHash(user_password, user.user_password)

      if (!passwordIsCorrect)
        throw new res.error(401, "Password in incorrect!")

      if (!user)
        throw new res.error(400, "User doesn't exist")

      // destroy old sessions if user exists
      await req.db.users_sessions.destroy({
        where: {
          user_id: user.user_id
        }
      })

      // create session for the user
      const session = await req.db.users_sessions.create({
        user_id: user.user_id,
        session_inet: ipAddress,
        session_user_agent: userAgent
      });

      // generate token using user's session
      const token = await signJwtToken({
        session_id: session.session_id,
      });

      const userData = await req.db.users.findOne({
        where: {
          user_id: user.user_id
        },
        attributes: {
          exclude: ["user_password"]
        }
      })

      res.status(201).json({
        ok: true,
        message: "Login successfully!",
        data: {
          token,
          user: userData
        }
      })
    } catch (error) {
      console.log(error)
      next(error);
    }
  }
}