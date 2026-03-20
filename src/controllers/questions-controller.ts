import { Request, Response } from "express"
import { prisma } from "../routes/prisma"

class QuestionsController {
  async index(request: Request, response: Response) {
    const questions = await prisma.question.findMany({
      where: {
        title: {
          contains:request.query.title?.toString().trim(),
          mode: 'insensitive'
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true // Isso faz o Prisma trazer os dados do Usuário que criou a Pergunta
      }
    });

    return response.json(questions);
  }

  async create(request: Request, response: Response) {
    const { title, content, user_id } = request.body;
    
    const question = await prisma.question.create({
      data: {
        title,
        content,
        userId: user_id
      }
    })
    return response.status(201).json(question)

  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, content } = request.body;
    
    const question = await prisma.question.update({
      data: {
        title,
        content
      },
      where: { id }
    })
    return response.json(question)
  }

  async remove(request: Request, response: Response) {
    const { id } = request.params;
    
    await prisma.question.delete({
      where: { id }
    })
    return response.json()
  }
}

export { QuestionsController }
