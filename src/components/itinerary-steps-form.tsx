'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Check, Luggage, Users, Calendar, Home } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface ItineraryStepsFormProps {
  destination: string
  onBack: () => void
}

interface RoomOptions {
  count: number
  adults: number
  children: number
}

interface FormData {
  duration: string
  travelers: string
  roomOptions: RoomOptions
}

export function ItineraryStepsForm({ destination, onBack }: ItineraryStepsFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    duration: '',
    travelers: '',
    roomOptions: {
      count: 1,
      adults: 2,
      children: 0
    }
  })

  const steps = [
    {
      title: 'Duration',
      description: 'How long would you like to stay?',
      icon: <Calendar className="h-8 w-8 text-primary" />
    },
    {
      title: 'Travelers',
      description: 'Who is traveling with you?',
      icon: <Users className="h-8 w-8 text-primary" />
    },
    {
      title: 'Room Options',
      description: 'Configure your accommodation',
      icon: <Home className="h-8 w-8 text-primary" />
    },
    {
      title: 'Confirmation',
      description: 'Review your trip details',
      icon: <Check className="h-8 w-8 text-primary" />
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  const updateRoomOption = (field: keyof RoomOptions, value: number) => {
    setFormData({
      ...formData,
      roomOptions: {
        ...formData.roomOptions,
        [field]: value
      }
    })
  }

  // Rest of the component remains the same...
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <RadioGroup
              value={formData.duration}
              onValueChange={(value) => updateFormData('duration', value)}
            >
              {[3, 5, 7, 10, 14].map((days) => (
                <div key={days} className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value={days.toString()} id={`duration-${days}`} />
                  <Label htmlFor={`duration-${days}`} className="flex-grow cursor-pointer">
                    {days} days
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 1:
        return (
          <div className="space-y-4">
            <RadioGroup
              value={formData.travelers}
              onValueChange={(value) => updateFormData('travelers', value)}
            >
              {[
                { id: 'solo', label: 'Solo Traveler' },
                { id: 'couple', label: 'Couple' },
                { id: 'family', label: 'Family' },
                { id: 'friends', label: 'Group of Friends' }
              ].map((option) => (
                <div key={option.id} className="flex items-center space-x-2 border p-4 rounded-md">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="mb-2 block">Number of Rooms</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomOption('count', Math.max(1, formData.roomOptions.count - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{formData.roomOptions.count}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomOption('count', formData.roomOptions.count + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Adults per Room</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomOption('adults', Math.max(1, formData.roomOptions.adults - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{formData.roomOptions.adults}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomOption('adults', Math.min(4, formData.roomOptions.adults + 1))}
                >
                  +
                </Button>
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Children per Room</Label>
              <div className="flex items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomOption('children', Math.max(0, formData.roomOptions.children - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{formData.roomOptions.children}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => updateRoomOption('children', Math.min(4, formData.roomOptions.children + 1))}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4 text-center">
            <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Congratulations!</h3>
            <p>Your trip to {destination} has been customized successfully.</p>
            <div className="bg-muted p-4 rounded-md mt-4 text-left">
              <h4 className="font-medium mb-2">Trip Summary:</h4>
              <ul className="space-y-2">
                <li>Destination: <span className="font-medium">{destination}</span></li>
                <li>Duration: <span className="font-medium">{formData.duration} days</span></li>
                <li>Travelers: <span className="font-medium">{formData.travelers}</span></li>
                <li>Accommodation: <span className="font-medium">{formData.roomOptions.count} room(s), {formData.roomOptions.adults} adult(s), {formData.roomOptions.children} children</span></li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              A travel expert will contact you shortly with a detailed itinerary.
            </p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center mb-2">
          <CardTitle>{steps[currentStep].title}</CardTitle>
        </div>
        <CardDescription className="flex items-center">
          {steps[currentStep].icon}
          <span className="ml-2">{steps[currentStep].description}</span>
        </CardDescription>

        {/* Step indicator */}
        <div className="flex mt-6 mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 relative">
              <div className={`h-1 ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
              <div className={`absolute top-0 left-0 mt-[-4px] h-2 w-2 rounded-full ${index <= currentStep ? 'bg-primary' : 'bg-gray-200'}`} />
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="py-2">
          {renderStepContent()}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button onClick={handleBack} variant="outline">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={handleNext}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={onBack}>
            Finish
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
