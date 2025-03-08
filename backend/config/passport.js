import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import userRepository from "../repositories/userRepository.js";
import { UnauthorizedError } from "../errors/customErrors.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET не задан в переменных окружения");
}

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      const user = await userRepository.getUserById(payload.id);
      if (!user) {
        return done(new UnauthorizedError("Пользователь не найден"), false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;