// routes/auth.ts
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Step 1: Redirect to Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Step 2: Google callback
router.get('/google/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: '/login',
}), (req, res) => {
  // Send token to frontend
  const user: any = req.user;
  const token = user._jwt;
  const redirectUrl = `${process.env.FRONTEND_URL}?token=${token}`;
  res.redirect(redirectUrl);
});

export default router;
