import express, { Router } from "express";
import { getUserDetails } from "../controllers/userControllers";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

router.get(
  "/:uid",
  authenticate,
  isAuthorized({ hasRole: ["admin"], allowSameUser: true }),
  getUserDetails
);

export default router;
