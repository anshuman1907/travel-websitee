'use client'

import Image from 'next/image'
import { Calendar, MapPin, Check } from 'lucide-react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Trip {
  id: number
  name: string
  duration: string
  price: string
  imageUrl: string
  amenities: string[]
  description: string
}

interface TripCardProps {
  trip: Trip
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={trip.imageUrl}
          alt={trip.name}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{trip.name}</CardTitle>
          <div className="text-lg font-bold text-primary">{ Math.floor(Math.random() * 400000) }</div>
        </div>

        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{null}</span>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <CardDescription className="mb-4">
          {trip.description}
        </CardDescription>

        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2">Amenities</h4>
          <div className="grid grid-cols-2 gap-2">
            {trip.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center text-sm">
                <Check className="h-4 w-4 mr-1 text-green-500" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full" variant="outline">View Details</Button>
      </CardFooter>
    </Card>
  )
}
