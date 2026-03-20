import { prisma } from "../src/routes/prisma"

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        name: "John Doe",
        email: "John@gmail.com",
      },
      {
        name: "Jane Doe",
        email: "Jane@gmail.com",
      },
      {
        name: "maycon Doe",
        email: "maycon@gmail.com",
      },
    ]
  });
}

seed().then(() => {
  console.log("Seeds executadas com sucesso");
  prisma.$disconnect();
});