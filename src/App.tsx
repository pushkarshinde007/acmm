import React from 'react'
import { ExperienceProvider } from '@/core/context/ExperienceContext'
import { NavigationProvider } from '@/core/context/NavigationContext'
import { HomePage } from '@/components/home/HomePage'

export const App: React.FC = () => {
  return (
    <ExperienceProvider>
      <NavigationProvider>
        <HomePage />
      </NavigationProvider>
    </ExperienceProvider>
  )
}

export default App
