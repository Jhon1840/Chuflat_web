import { TestimonialControls } from "./TestimonialControls"

interface TestimonialProps {
    quote: string
    author: string
    role: string
  }
  
  export function Testimonial({ quote, author, role }: TestimonialProps) {
    return (
      <>
        <blockquote className="mt-8">
          <div className="max-w-3xl mx-auto text-center text-2xl font-medium">
            <p>"{quote}"</p>
          </div>
          <footer className="mt-8">
            <div className="md:flex md:items-center md:justify-center">
              <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                <div className="text-base font-medium">{author}</div>
                <svg className="hidden md:block mx-1 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 0h3L9 20H6l5-20z" />
                </svg>
                <div className="text-base font-medium text-gray-400">{role}</div>
              </div>
            </div>
          </footer>
        </blockquote>
        <TestimonialControls />
      </>
    )
  }
