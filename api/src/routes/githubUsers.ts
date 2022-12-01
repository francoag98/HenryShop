import { Router, Request, Response } from "express";
import passport from "passport";
import { githubUser } from "../Types";
import {
  addNewGithubUser,
  getGithubUserById,
  getGithubUserByUsername,
} from "../controllers/githubUser/index";
const userValidation = require("../middlewares/userValidation");
const jwt = require("jsonwebtoken");
import { GithubUser } from "../models/githubUser";
const routes = Router();
const CLIENT_URL: string = process.env.CLIENT_URL as string;

routes.get(
  "/github",
  passport.authenticate("auth-github", {
    scope: ["user", "email"],
    session: false,
  })
);

routes.get(
  "/github/callback",
  passport.authenticate("auth-github", {
    scope: ["user", "email"],
    session: false,
  }),
  async (req: Request, res: Response) => {
    let newUser: string = JSON.stringify(req.user);
    let newUser2: any = JSON.parse(newUser) as object;
    //crea usuario github
    const newUserObj: githubUser = {
      username: newUser2.username,
      githubId: newUser2.nodeId,
      birthday: null,
      isAdmin: false,
      confirmed: true,
      shopping: [],
      deleted: false,
    };
    const result = await addNewGithubUser(newUserObj);
    const user = result ? result : { username: "", email: "", id: "" };
    const userForToken = { id: user.id, username: user.username, origin: "github" };
    const token = jwt.sign(userForToken, process.env.SECRETKEY);
    const response = {
      error: false,
      message: "login successful",
      user: { username: userForToken.username, token: token, origin: "github" },
    };
    const jsonResponse = JSON.stringify(response);
    res.status(200).send(
      `<!DOCTYPE HTML>
			<html lang="en">
				<body></body>
				<script>
					window.opener.postMessage(${jsonResponse}, '${CLIENT_URL}');
					console.log('aa');
				</script>
			</html>
		`
    );
  }
);

routes.get(
  "/getGithubUserByToken",
  userValidation,
  async (req: Request, res: Response) => {
    try {
      const authorization = req.get("authorization");
      let token: string | undefined = authorization?.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRETKEY);
      const id = decodedToken.id;
      const user = await GithubUser.findById(id);
      user
        ? res.status(200).send(user)
        : res.status(400).send("el usuario no esta confirmado");
    } catch (error: any) {
      res.status(401).send("Erorr isConfirmed");
    }
  }
);

routes.get("/:username", async (req: Request, res: Response) => {
  try {
    const result = await getGithubUserByUsername(req.params.username);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

export default routes;
