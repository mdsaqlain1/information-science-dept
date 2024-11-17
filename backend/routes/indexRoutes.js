import express from "express";
const router = express.Router();
import adminRoute from "./adminRoutes.js";
import studentrRoute from "./studentRoutes.js";
import staffRoute from "./staffRoutes.js";
import courseRoute from "./courseRoutes.js";
import { signIn } from "../controller/signIn.js";
import { authorizeUser } from "../controller/authoriseUser.js";
import jwtMiddleware from "../middleware/jwtMiddleware.js";

router.use("/admin", adminRoute);
router.use("/student", studentrRoute);
router.use("/staff", staffRoute);
router.use("/courses", courseRoute);
router.post("/signin", signIn);
router.post("/authoriseuser", jwtMiddleware, authorizeUser);

export default router;
