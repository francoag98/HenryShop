const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const passport = require('passport');

const GOOGLE_ID:string = (process.env.GOOGLE_ID as string);
const GOOGLE_SECRET:string = (process.env.GOOGLE_SECRET as string);

const GITHUB_ID:string = (process.env.GITHUB_ID as string);
const GITHUB_SECRET:string = (process.env.GITHUB_SECRET as string);

passport.use(
	new GoogleStrategy({
			clientID: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET,
			callbackURL: '/googleusers/google/callback',
			scope: ["profile", "email"],
		},
		(accesToken:any, refreshToken:any, profile:any, callback:any) => {
			callback(null, profile);
		}
	)
);

passport.use('auth-github',
	new GithubStrategy({
			clientID: GITHUB_ID,
			clientSecret: GITHUB_SECRET,
			callbackUrl:'/githubusers/github/callback',
		},
		(accesToken:any, refreshToken:any, profile:any, callback:any) => {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user:any, done:any) => {
	done(null, user);
});

passport.deserializeUser((user:any, done:any) => {
	done(null, user);
});
