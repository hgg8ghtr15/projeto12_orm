import { Request, Response } from "express";
import { prisma } from "../routes/prisma";

class UsersController {
  async index(request: Request, response: Response) {
    const users = await prisma.users.findMany();
    return response.json(users);
  }

  async create(request: Request, response: Response) {
    const { name, email } = request.body;

    await prisma.users.create({
      data: {
        name,
        email,
      },
    });

    return response.status(201).json();
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const user = await prisma.users.findUnique({ where: { id } });
    return response.json(user);
  }
}

export { UsersController };
