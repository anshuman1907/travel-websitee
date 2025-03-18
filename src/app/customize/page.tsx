'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ItineraryStepsForm } from '@/components/itinerary-steps-form'

const DESTINATIONS = [
  "Maldives", "Egypt", "Bali", "Dubai", "Japan",
  "Australia", "Thailand", "Singapore", "Switzerland",
  "Greece", "Italy", "France", "Spain", "USA",
  "Canada", "New Zealand", "South Africa",  "Brazil",
  "Morocco", "Turkey"
]

export default function CustomizePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDestinations, setFilteredDestinations] = useState(DESTINATIONS)
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)

  useEffect(() => {
    if (searchTerm) {
      const filtered = DESTINATIONS.filter(dest =>
        dest.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredDestinations(filtered)
    } else {
      setFilteredDestinations(DESTINATIONS)
    }
  }, [searchTerm])

  const handleDestinationSelect = (destination: string) => {
    setSelectedDestination(destination)
  }

  return (
    <div className="container mx-auto py-12 max-w-4xl px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Customize Your <p className="inline text-primary font-bold hover:text-green-500"> Journey</p></h1>

      {!selectedDestination ? (
        <Card>
          <CardContent className="pt-6">
            <div className="mb-6">
              <div className="relative text-black">
                <Search className="absolute left-3 top-3 h-5 w-5 text-black" />
                <Input
                  placeholder= " Pick your destination " 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredDestinations.map((destination) => (
                <Button
                  key={destination}
                  variant="outline"
                  className="h-auto py-3 justify-start"
                  onClick={() => handleDestinationSelect(destination)}
                >
                  {destination}
                </Button>
              ))}

              {filteredDestinations.length === 0 && (
                <p className="text-muted-foreground col-span-full text-center py-4">
                  No destinations found. Try a different search term.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <ItineraryStepsForm destination={selectedDestination} onBack={() => setSelectedDestination(null)} />
      )}
    </div>
  )
}
