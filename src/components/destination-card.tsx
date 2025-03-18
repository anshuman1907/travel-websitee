'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card'
import { Flow_Rounded } from 'next/font/google'

interface Destination {
  id: number
  name: string
  handle: string
  imageUrl: string
  description: string
  price: string
}

interface DestinationCardProps {
  destination: Destination
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const router = useRouter()

  const handleExplore = () => {
    router.push(`/destination/${destination.handle}`)
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="pt-6 flex-grow">
        <CardTitle className="text-xl mb-2">{destination.name}</CardTitle>
        <CardDescription className="line-clamp-3">
          {destination.description}
        </CardDescription>
        <p className="text-sm font-semibold text-primary mt-2">
          Starting from { Math.floor(Math.random() * 400000) } 
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="default"
          className="w-full"
          onClick={handleExplore}
        >
          Explore
        </Button>
      </CardFooter>
    </Card>
  )
}
