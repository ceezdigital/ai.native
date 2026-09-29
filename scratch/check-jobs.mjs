import { PrismaClient } from './frontend/node_modules/@prisma/client/index.js'
const prisma = new PrismaClient()
async function run() {
  const jobs = await prisma.job.findMany()
  console.log("JOBS:", JSON.stringify(jobs, null, 2))
}
run().catch(console.error).finally(() => prisma.$disconnect())
