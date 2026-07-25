const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:postgres@localhost:5432/restoration_community'
    }
  }
});

(async () => {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Prisma connection successful:', result);
  } catch (error) {
    console.error('Prisma connection error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
