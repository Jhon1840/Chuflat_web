import { ReactNode } from 'react'
import NextImage from 'next/image'
import { Testimonial } from './Testimonial'

interface AuthLayoutProps {
  children: ReactNode
  imageSrc: string
  testimonial: {
    quote: string
    author: string
    role: string
  }
}

export function AuthLayout({ children, imageSrc, testimonial }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        {children}
      </div>
      <div className="flex-1 hidden lg:block relative">
        <NextImage
          className="absolute inset-0 h-full w-full object-cover"
          src={imageSrc}
          alt="Rock concert"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex flex-col justify-center px-8">
          <Testimonial
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
          />
        </div>
      </div>
    </div>
  )
}