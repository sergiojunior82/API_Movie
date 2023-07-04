const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const usersRoutes = Router();

const userControlller = new UsersController();

usersRoutes.post("/", userControlller.create);
usersRoutes.put("/:id", userControlller.update);

module.exports = usersRoutes;