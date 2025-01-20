import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (req.method === 'GET') {
    try {
      const spaces = await prisma.space.findMany({
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return res.status(200).json(spaces)
    } catch (error) {
      console.error('Error fetching spaces:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
      const { title, description, imageUrl } = req.body

      if (!title || !description || !imageUrl) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const space = await prisma.space.create({
        data: {
          title,
          description,
          imageUrl,
          authorId: session.user.id,
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      })

      return res.status(201).json(space)
    } catch (error) {
      console.error('Error creating space:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
