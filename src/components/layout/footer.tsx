'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4 hover:text-green-600">TravelExplorer</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Discover the world with us. We create unforgettable travel experiences
              tailored to your preferences.
            </p>
            {/* <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4 hover:text-green-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/customize" className="text-gray-300 hover:text-white text-sm">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/get-in-touch" className="text-gray-300 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="font-bold mb-4 hover:text-green-600">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/destination/turkey" className="text-gray-300 hover:text-white text-sm">
                Turkey
                </Link>
              </li>
              <li>
                <Link href="/destination/egypt" className="text-gray-300 hover:text-white text-sm">
                  Egypt
                </Link>
              </li>
              <li>
                <Link href="/destination/south-africa" className="text-gray-300 hover:text-white text-sm">
                South Africa
                </Link>
              </li>
              <li>
                <Link href="/destination/bhutan" className="text-gray-300 hover:text-white text-sm">
                  Bhutan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4 hover:text-green-600">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-300 text-sm">
                  123 Travel St, City, Country
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300 text-sm">+91********1</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300 text-sm">t********@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>  <b>TravelExplorer</b></p>
        </div>
      </div>
    </footer>
  )
}
