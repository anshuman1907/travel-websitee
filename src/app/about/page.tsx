import { MapPin, Globe, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Travel <p className='inline text-primary font-bold hover:text-green-600'>Explorer</p></h1>

        <div className="prose prose-lg mx-auto mb-12">
          <p className="text-xl text-muted-foreground text-center mb-12">
            We are dedicated to creating unforgettable travel experiences tailored to your preferences.
            From exotic getaways to cultural adventures, we take care of every detail.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
            <div className="bg-primary/5 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p>
                To inspire and empower travelers by creating authentic and transformative
                experiences that connect people to the world's most extraordinary destinations.
              </p>
            </div>

            <div className="bg-primary/5 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p>
                To be the most trusted travel partner, known for exceptional service,
                innovative solutions, and our commitment to sustainable and responsible tourism.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Global Expertise</h3>
                <p className="text-muted-foreground">
                  With destinations across six continents, our travel experts bring in-depth
                  knowledge and insider access to every journey.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Personalized Service</h3>
                <p className="text-muted-foreground">
                  We take the time to understand your travel style and preferences to create
                  a custom journey that's uniquely yours.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  We personally vet each experience, accommodation, and service provider to
                  ensure the highest standards.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Local Connections</h3>
                <p className="text-muted-foreground">
                  Our network of local partners provides authentic experiences that go beyond
                  typical tourist attractions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Commitment to Responsible Travel</h2>
            <p className="mb-4">
              At TravelExplorer, we believe that travel should benefit both visitors and the
              communities they explore. We are committed to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Supporting local economies and businesses</li>
              <li>Minimizing environmental impact</li>
              <li>Respecting cultural heritage and traditions</li>
              <li>Promoting authentic, meaningful experiences</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
