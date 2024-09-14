import express from "express"; 
import { createEmail, deleteEmail, getAllEmailById } from "../Controllers/email.controllers.js";
import isAuthenticated from "../middelware/isAutheenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createEmail);
router.route("/:id").delete(isAuthenticated, deleteEmail);
router.route("/getallemails").get(isAuthenticated, getAllEmailById);


export default router;