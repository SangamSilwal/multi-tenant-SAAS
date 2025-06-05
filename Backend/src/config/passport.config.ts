// config/passport.ts
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback',
}, async (_accessToken, _refreshToken, profile, done) => {
  try {
    const authProviderId = profile.id;
    const email = profile.emails?.[0].value;

    let user = await UserModel.findOne({ authProviderId });

    if (!user) {
      user = await UserModel.create({
        email,
        authProviderId
      });
    }

    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Attach token to user object
    (user as any)._jwt = token;

    return done(null, user);
  } catch (err) {
    done(err,undefined);
  }
}));
