import { Router, Request, Response } from "express";
import {
  addNewGoogleUser,
  getAllGoogleUsers,
  getGoogleUserByEmail,
  getGoogleUserById,
} from "../controllers/googleUser/index";
import { googleUser } from "../Types";
import { GoogleUser } from "../models/googleUser";
import passport from "passport";
const jwt = require("jsonwebtoken");
const userValidation = require("../middlewares/userValidation");

const CLIENT_URL: string = process.env.CLIENT_URL as string;
const routes = Router();

routes.post("/", async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await addNewGoogleUser(user);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

routes.get("/admin", async (req: Request, res: Response) => {
  try {
    const result = await getAllGoogleUsers();
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});
routes.get(
  "/getGoogleUserByToken",
  userValidation,
  async (req: Request, res: Response) => {
    try {
      const authorization = req.get("authorization");

      let token: string | undefined = authorization?.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.SECRETKEY);
      const id = decodedToken.id;
      const user = await GoogleUser.findById(id);
      user
        ? res.status(200).send(user)
        : res.status(400).send("el usuario no esta confirmado");
    } catch (error: any) {
      res.status(401).send("Erorr isConfirmed");
    }
  }
);

routes.get("/login/success", async (req: Request, res: Response) => {
  if (req.user) {
    console.log("hay usuario");
    let newUser: string = JSON.stringify(req.user);
    let newUser2: any = JSON.parse(newUser) as object;
    const user = await getGoogleUserById(newUser2.id);
    const user2 = user ? user : { name: "", email: "", id: "" };
    const userForToken = { id: user2.id, email: user2.email };
    const token = jwt.sign(userForToken, process.env.SECRETKEY);
    const response = {
      error: false,
      message: "login succesful",
      user: {
        username: user2.name.split(" ")[0],
        token: token,
        origin: "google",
        email: user2.email,
      },
    };
    const jsonResponse = JSON.stringify(response);
    res.status(200).send(
      `<!DOCTYPE HTML>
				<html lang="en">
					<body></body>
					<script>
						window.opener.postMessage(${jsonResponse}, '${CLIENT_URL}')
					</script>
				</html>
			`
    );
  }
});

routes.get("/login/failed", (req: Request, res: Response) => {
  res.status(401).json({ error: true, message: "login failed" });
});


routes.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req: Request, res: Response) => {
    try {
      let newUser: string = JSON.stringify(req.user);
      let newUser2: any = JSON.parse(newUser) as object;
      console.log(newUser2.emails[0].value);
      const newUserObj: googleUser | null =
        typeof newUser2 === "object"
          ? {
              name: newUser2.displayName,
              googleId: newUser2.id,
              email: newUser2.emails[0].value,
              birthday: null,
              isAdmin: false,
              confirmed: true,
              shopping: [],
              deleted: false,
            }
          : null;
      const result: object | null =
        typeof newUserObj !== null
          ? addNewGoogleUser(newUserObj as googleUser)
          : null;
      res.redirect(`/googleusers/login/success`);
    } catch (error: any) {
      console.log(error.message);
    }
  }
);


routes.get(
  "/google",
  passport.authenticate("google", { scope: ["google", "email"] })
);

routes.get("/google/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect(CLIENT_URL);
  });
  res.redirect(CLIENT_URL);
});

routes.get("/:email", async (req: Request, res: Response) => {
  try {
    const result = await getGoogleUserByEmail(req.params.email);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

export default routes;
