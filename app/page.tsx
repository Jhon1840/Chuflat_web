'use client'
import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { PlayCircle, PauseCircle, SkipForward, SkipBack, Volume2, Badge, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/app/components/ui/input"
import { Carousel, CarouselContent, CarouselItem } from "@/app/components/ui/carousel"
import useEmblaCarousel from "embla-carousel-react"
import { useState, useEffect, useCallback } from 'react'


const carouselImages = [
  "/img/chuflayl.jpg",
  "/img/chuflayl.jpg",
  "/img/chuflayl.jpg",
]


export default function HomePage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        scrollNext()
      }, 5000)

      return () => clearInterval(intervalId)
    }
  }, [emblaApi, scrollNext])

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative h-screen">
        <Carousel ref={emblaRef} className="w-full h-full">
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="w-full h-full">
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`Chuflay band photo ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center">
            <h1 className="text-7xl font-extrabold mb-4 text-red-500">CHUFLAY</h1>
            <p className="text-2xl mb-8">Igniting Stages Since 2015</p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                <PlayCircle className="mr-2 h-6 w-6" />
                Play Latest Single
              </Button>
              <Button size="lg" className="bg-white text-red-500 hover:bg-gray-200">
                <Link href="/merchandise">Shop Merch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">Meet the Band</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Alex Thunder", "Sam Riff", "Max Beat", "Charlie Bass"].map((member, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4"></div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle>{member}</CardTitle>
                  <p className="text-gray-400">Role</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Discography Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">Our Music</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Electric Dreams", "Neon Nights", "Sonic Boom"].map((album, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="w-full h-64 bg-gray-700"></div>
                </CardHeader>
                <CardContent>
                  <CardTitle>{album}</CardTitle>
                  <p className="text-gray-400">2023</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Listen Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tour Dates Section */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center">Upcoming Shows</h2>
          <div className="space-y-4">
            {["New York", "Los Angeles", "Chicago"].map((city, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold">Jul 15</div>
                    <div>
                      <div className="font-semibold">Rock Arena, {city}</div>
                    </div>
                  </div>
                  <Badge>On Sale</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">Stay Connected</h2>
          <p className="text-xl mb-8">Join our newsletter for exclusive updates and offers!</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-gray-800 border-gray-700 text-white"
            />
            <Button type="submit" className="bg-red-500 hover:bg-red-600">
              <Mail className="mr-2 h-4 w-4" /> Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
              <a key={social} href="#" className="hover:text-red-500 transition-colors">
                {social}
              </a>
            ))}
          </div>
          <p className="text-gray-400">© 2023 Chuflay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}