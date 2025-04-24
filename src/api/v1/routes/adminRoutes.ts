import express, { Router } from "express";
import { setCustomClaims } from "../controllers/adminControllers";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router: Router = express.Router();

/**
 * NOTE: You'll need to disable isAuthorized when you're setting the role
 * for your first user. You can just comment it out:
);
 */

router.post(
  "/setCustomClaims",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  setCustomClaims
);

export default router;
