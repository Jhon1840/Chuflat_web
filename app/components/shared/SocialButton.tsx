import { ComponentProps } from 'react'

interface SocialButtonProps extends ComponentProps<'button'> {
  icon: React.ReactNode
  children: React.ReactNode
}

export function SocialButton({ icon, children, ...props }: SocialButtonProps) {
  return (
    <button
      className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}