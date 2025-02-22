import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient | undefined
}

const createPrismaClient = (): PrismaClient => {
  return new PrismaClient()
}

const getPrismaClient = (): PrismaClient => {
  if (process.env.NODE_ENV === "production") {
    return createPrismaClient()
  }

  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient()
  }

  return global.cachedPrisma
}

export const db = getPrismaClient()
