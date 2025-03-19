'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { MapPin, Calendar, Star, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TripCard } from '@/components/trip-card'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config'


interface TripItem {
  "trip-name": string
  price: number
  duration: string
  amenities: string[]
}

interface Trip {
  id: number
  name: string
  duration: string
  price: string
  imageUrl: string
  amenities: string[]
  description: string
}

interface DestinationData {
  name: string
  description: string
  bannerImage: string
  trips: Trip[]
}

// Sample images for destinations
const DESTINATION_IMAGES: Record<string, string> = {
  'egypt': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004325/egypt_scwdiy.jpg',
  'bhutan': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004579/bhutan_qw3z0m.jpg',
  'turkey': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004393/turkey_urabbl.jpg',
  'kenya': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004527/kenya_eaeull.jpg',
  'south-africa': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739004461/south-africa_ifpult.jpg',
  'default': 'https://res.cloudinary.com/dradkp5i6/image/upload/v1739002714/ocean-7890172_1280_wikk5e.jpg'
};

// Sample trip images for better UI
const TRIP_IMAGES = [
  'https://picsum.photos/800/500?travel',
  'https://picsum.photos/800/500?egypt',
  'https://picsum.photos/800/500?bhutan',
  'https://picsum.photos/800/500?travel',
  'https://picsum.photos/800/500?travel',  

];







export default function DestinationPage() {
  const router = useRouter()
  const params = useParams()
  const handle = params.handle as string

  const [destinationData, setDestinationData] = useState<DestinationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true)
        // Fetch destination data based on the handle
        const response = await axios.get(`https://json-data-1wm2.onrender.com/destination/${handle}`)

        // Transform the response data
        const tripsData = response.data.trips || [];
        const transformedTrips = tripsData.map((trip: TripItem, index: number) => ({
          id: index + 1,
          name: trip["trip-name"],
          duration: trip.duration,
          price: `$${trip.price}`,
          imageUrl: TRIP_IMAGES[index % TRIP_IMAGES.length],
          amenities: trip.amenities,
          description: `Experience the wonders of ${handle} with this amazing trip package.`
        }));

        // Create destination data
        const destinationInfo: DestinationData = {
          name: handle.charAt(0).toUpperCase() + handle.slice(1).replace(/-/g, ' '),
          description: `Explore the magic of ${handle.replace(/-/g, ' ')} with our specially curated trips that combine adventure, culture, and relaxation.`,
          bannerImage: DESTINATION_IMAGES[handle] || DESTINATION_IMAGES.default,
          trips: transformedTrips
        };

        setDestinationData(destinationInfo);
        setError(null)
      } catch (err) {
        console.error('Error fetching destination:', err)
        setError('Failed to load destination data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    if (handle) {
      fetchDestination()
    }
  }, [handle])

  const handleContactExpert = () => {
    router.push('/get-in-touch')
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
        <div className="max-w-3xl mx-auto">
          <div className="h-10 bg-gray-200 animate-pulse rounded mb-4 w-1/3"></div>
          <div className="h-6 bg-gray-200 animate-pulse rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden h-[400px] animate-pulse">
                <div className="h-full bg-gray-200"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !destinationData) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
        <p className="mb-6">{error || 'Destination not found'}</p>
        <Button onClick={() => router.push('/')}>Return Home</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner Image */}
      <div className="relative w-full h-[400px]">
        <Image
          src={destinationData.bannerImage}
          alt={destinationData.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-4xl font-bold mb-2">{destinationData.name}</h1>
          <p className="max-w-2xl text-center">{destinationData.description}</p>
        </div>
      </div>

      {/* Trip Listings */}
      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Available Trips to {destinationData.name}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {destinationData.trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>

      {/* Fixed "Talk to an Expert" button */}
      <div className="sticky bottom-0 w-full  p-4 border-t">
        <div className="container mx-auto max-w-6xl">
          <Button
            className="w-full md:w-auto md:float-right"
            onClick={handleContactExpert}
            size="lg"
          >
            <Phone className="mr-2 h-4 w-4" /> Talk to an Expert
          </Button>
        </div>
      </div>
    </div>

    
  )

  


}
