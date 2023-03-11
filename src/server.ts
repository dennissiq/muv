import { PrismaClient } from "@prisma/client"
import fastify from "fastify"
import { z } from "zod"
import { fieldEncryptionMiddleware } from "prisma-field-encryption"

const app = fastify()

const prisma = new PrismaClient()

//encrypt fields
prisma.$use(
  fieldEncryptionMiddleware({
    encryptionKey: process.env.PRISMA_FIELD_ENCRYPTION_KEY,
  })
)

app.get("/users", async () => {
  const users = await prisma.user.findMany()

  return { users }
})

app.post("/users", async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
  })

  const { name, username, password, email } = createUserSchema.parse(
    request.body
  )

  await prisma.user.create({
    data: {
      name,
      username,
      password,
      email,
    },
  })

  return reply.status(201).send()
})

app.get("/movies", async () => {
  const movies = await prisma.movie.findMany()

  return { movies }
})

app.post("/movies", async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    path: z.string(),
  })

  const { name, description, path } = createUserSchema.parse(request.body)

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
