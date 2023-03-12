import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import { z } from "zod"
import { createUserController } from "./useCases/CreateUser"

const app = fastify()

const prisma = new PrismaClient()

app.get("/users", async () => {
  const users = await prisma.user.findMany()

  return { users }
})

app.post("/users", async (request, reply) => {
  return createUserController.handle(request, reply)
})

app.get("/movies", async () => {
  const movies = await prisma.movie.findMany()

  return { movies }
})

app.post("/movies", async (request, reply) => {
  const createMovieSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    path: z.string(),
  })

  const { name, description, path } = createMovieSchema.parse(request.body)

  await prisma.movie.create({
    data: {
      name,
      description,
      path,
    },
  })

  return reply.status(201).send()
})

app
  .listen({
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
  .then(() => {
    console.log(`HTTP Server Running in port ${process.env.PORT || 3333}`)
  })
