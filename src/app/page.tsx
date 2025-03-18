
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Banner } from '@/components/banner-carousel'
import { DestinationCard } from '@/components/destination-card'

interface BannerItem {
  img: string
  alt: string
}

interface DestinationItem {
  img: string
  title: string
  handle: string
}

// Transformed interfaces for our components
interface BannerData {
  id: number
  imageUrl: string
  title: string
  description: string
}

interface DestinationData {
  id: number
  name: string
  handle: string
  imageUrl: string
  description: string
  price: string
}

// Default banner data in case API fails
const DEFAULT_BANNERS: BannerData[] = [
  {
    id: 1,
    imageUrl: "https://res.cloudinary.com/dradkp5i6/image/upload/v1739002714/ocean-7890172_1280_wikk5e.jpg",
    title: "Explore Amazing Destinations",
    description: "Discover beautiful places around the world with our experienced travel guides."
  },
  {
    id: 2,
    imageUrl: "https://res.cloudinary.com/dradkp5i6/image/upload/v1739002955/hot-air-ballons_vlbpaw.jpg",
    title: "Unforgettable Experiences",
    description: "Create memories that will last a lifetime with our special travel packages."
  },
  {
    id: 3,
    imageUrl: "https://res.cloudinary.com/dradkp5i6/image/upload/v1739003014/germany_j885ao.jpg",
    title: "Adventure Awaits",
    description: "Find your next adventure with customized travel plans for every type of traveler."
  }
];

export default function Home() {
  const router = useRouter()
  const [banners, setBanners] = useState<BannerData[]>(DEFAULT_BANNERS)
  const [destinations, setDestinations] = useState<DestinationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, destinationsRes] = await Promise.all([
          axios.get('https://json-data-1wm2.onrender.com/banners'),
          axios.get('https://json-data-1wm2.onrender.com/featured-destination')
        ])

        // Transform banner data
        try {
          const bannersData = bannersRes.data.banners || [];
          if (Array.isArray(bannersData) && bannersData.length > 0) {
            const transformedBanners = bannersData.map((banner: BannerItem, index: number) => ({
              id: index + 1,
              imageUrl: banner.img,
              title: `Explore Amazing Destinations`,
              description: `Discover beautiful places around the world with our experienced travel guides.`
            }));

            setBanners(transformedBanners);
          }
        } catch (e) {
          console.error('Error processing banner data:', e);
          // Keep default banners
        }

        // Transform destination data
        try {
          const destinationsData = destinationsRes.data.destination || [];
          if (Array.isArray(destinationsData) && destinationsData.length > 0) {
            const transformedDestinations = destinationsData.map((dest: DestinationItem, index: number) => ({
              id: index + 1,
              name: dest.title,
              handle: dest.handle,
              imageUrl: dest.img,
              description: `Experience the wonders of ${dest.title} with our curated travel packages.`,
              price: `$${Math.floor(Math.random() * 1000) + 500}`
            }));

            setDestinations(transformedDestinations);
          }
        } catch (e) {
          console.error('Error processing destination data:', e);
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearchClick = () => {
    router.push('/customize')
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Carousel with Search Bar */}
      <div className="relative w-full h-[600px]">
        <Banner banners={banners} loading={loading} />

        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-full max-w-2xl px-4">
            <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-center mb-4  ">Discover <b className='text-blue-800 bg-clip-text hover:text-green-700'>Your Dream</b> Destination</h2>
                <div
                  className="flex items-center border rounded-lg p-4 cursor-pointer hover:border-primary"
                  onClick={handleSearchClick}
                >
                  <Search className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground">Where would you <p className='inline text-orange-500'>like</p>  to go?</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Popular Destinations Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="h-[350px] animate-pulse">
                <div className="h-full bg-gray-200"></div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations && destinations.length > 0 ? (
              destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))
            ) : (
              <p className="text-center col-span-3 py-12 text-muted-foreground">
                No destinations available at the moment. Please check back later.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
