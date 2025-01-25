const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function main() {
  try {
    // ユーザーデータの作成
    console.log('Seeding users...');
    const usersFile = path.join(__dirname, 'seed', 'users.csv');
    const usersContent = fs.readFileSync(usersFile, { encoding: 'utf-8' });
    const userRecords = csv.parse(usersContent, {
      columns: true,
      skip_empty_lines: true
    });

    const userMap = new Map();

    for (const record of userRecords) {
      const user = await prisma.user.create({
        data: {
          username: record.username,
          email: record.email,
          password: await bcrypt.hash('password123', 10), // 開発用のデフォルトパスワード
          name: record.name,
          bio: record.bio,
          image: record.image
        },
      });
      userMap.set(record.username, user.id);
      console.log(`Created user: ${user.username}`);
    }

    // スペースデータの作成
    console.log('Seeding spaces...');
    const spacesFile = path.join(__dirname, 'seed', 'spaces.csv');
    const spacesContent = fs.readFileSync(spacesFile, { encoding: 'utf-8' });
    const spaceRecords = csv.parse(spacesContent, {
      columns: true,
      skip_empty_lines: true
    });

    for (const record of spaceRecords) {
      const space = await prisma.space.create({
        data: {
          title: record.title,
          subtitle: record.subtitle,
          url: record.url,
          category: record.category,
          runtime: record.runtime,
          authorId: userMap.get(record.authorId) || userMap.get('hexgrad'), // デフォルトユーザー
          visibility: 'public'
        },
      });
      console.log(`Created space: ${space.title}`);
    }

    console.log('Seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
