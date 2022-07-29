import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

async function main (): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    return
  }

  /*
    seed code here
  */

  console.log('seed complete')
}

main()
  .catch(async (err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => {
    void (async () => {
      await prisma.$disconnect()
    })()
  })
