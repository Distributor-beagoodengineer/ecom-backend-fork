import express from 'express';
import { deleteUser, getAllUsers, getUser, newUser } from '../controllers/user.controller.js';
import { adminOnly } from '../middlewares/auth.js';

const app = express.Router();

// Route: /api/v1/user/{nameOfRoute}
app.post("/new", newUser);
app.get("/all", adminOnly, getAllUsers);
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);

// For App
app.get("/app/all", getAllUsers);
app.route("/app/:id").get(getUser).delete(deleteUser);

export default app;