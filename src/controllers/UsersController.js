const knex = require("../database/knex");
const { hash, compare } = require("bcryptjs");
const AppError = require('../utils/AppError');

class UsersController {

  async create(request, response) {
    const { name, email, password } = request.body;
    const checkUserExists = await knex("users").where( { email });

    if(checkUserExists.length != 0) {
      throw new AppError("Este email já foi cadastrado!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    });

    return response.json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({id}).first();

    if(!user) {
      throw new AppError("Usuário não existe");
    }

    const userWidthUpdatedEmail = await knex("users").where({email}).first();

    if(userWidthUpdatedEmail && userWidthUpdatedEmail.id !== user.id){
      throw new AppError("Este e-mail esta em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir nova senha");
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);

    }

    await knex("users").where({ id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now()
    });
    
    return response.json();
  }
}

module.exports = UsersController;