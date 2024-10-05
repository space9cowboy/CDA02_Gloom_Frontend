import React from 'react'


export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 w-full mt-6">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
        <p className="text-sm">© 2024 Gloom. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
        </div>
        
      </div>
    </footer>
  )
}


