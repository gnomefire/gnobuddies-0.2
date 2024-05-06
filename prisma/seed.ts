import { PrismaClient } from '@prisma/client';
import {  getAllQuestions } from '../src/lib/trivia.ts';

const prisma = new PrismaClient();

async function main() {
  const questions = await getAllQuestions().then((data) => data);
  const categories = await prisma.category.findMany();

  for (const question of questions) {
    let category = categories.find((c) => c.name === question.category);
    if (!category) {
      category = await prisma.category.upsert({
        where: { name: question.category },
        update: {},
        create: {
          name: question.category,
        }
        
        },
      ).catch((e) => console.error(e));
    }

    await prisma.jQuestion.create({
      data: {
        category: {
          connect: {
            id: category.id,
          },
        },
        airDate: question.airDate,
        question: question.question,
        answer: question.answer,
        value: question.value,
        round: question.round,
        showNumber: Number(question.showNumber),

        // Add other question data fields here
      },
    }).catch((e) => console.error(e))
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
