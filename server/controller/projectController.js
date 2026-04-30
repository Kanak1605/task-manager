import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProject = async (req, res) => {
  const project = await prisma.project.create({
    data: {
      name: req.body.name,
      ownerId: req.user.id,
    },
  });

  res.json(project);
};

export const getProjects = async (req, res) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
};
export const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: {
        members: {
          connect: { id: userId },
        },
      },
      include: { members: true },
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};