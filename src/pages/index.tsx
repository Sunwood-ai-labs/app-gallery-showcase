import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import { useState } from 'react'

interface Space {
  id: string
  title: string
  description: string
  imageUrl: string
  author: {
    name: string
  }
}

export default function Home() {
  const { data: session } = useSession()
  const [spaces, setSpaces] = useState<Space[]>([])

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Discover Amazing</span>
            <span className="block text-primary-600">Hugging Face Spaces</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Explore the best machine learning models, datasets, and applications created by the community.
          </p>
        </div>

        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {spaces.map((space) => (
            <div key={space.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={space.imageUrl} alt="" />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-primary-600">
                    Space
                  </p>
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{space.title}</p>
                    <p className="mt-3 text-base text-gray-500">{space.description}</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">{space.author.name}</span>
                    <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${space.author.name}`} alt="" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {space.author.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
