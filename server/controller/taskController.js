import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        dueDate: new Date(dueDate),
        assignedTo: req.user.id,
      },
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { assignedTo: req.user.id },
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { status },
    });

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};