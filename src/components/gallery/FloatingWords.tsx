import React from 'react'

interface FloatingWordItem {
  text: string
  delay: string
  duration: string
  x: string
  y: string
}

const FLOATING_WORDS: FloatingWordItem[] = [
  { text: 'CODEX CRYPTUM', delay: '0s', duration: '45s', x: '5%', y: '10%' },
  { text: 'THE NEURAL HACK', delay: '3s', duration: '55s', x: '80%', y: '15%' },
  { text: 'CRYPTIC HUNT', delay: '6s', duration: '50s', x: '10%', y: '35%' },
  { text: 'APPTITUDE', delay: '0s', duration: '60s', x: '70%', y: '40%' },
  { text: 'CODART', delay: '3s', duration: '48s', x: '25%', y: '20%' },
  { text: 'REVERSE CODING', delay: '6s', duration: '52s', x: '85%', y: '30%' },
  { text: 'HOUR OF CODE', delay: '0s', duration: '58s', x: '2%', y: '45%' },
  { text: 'CODE2CREATE', delay: '3s', duration: '47s', x: '60%', y: '10%' },
  { text: 'THE TINY HACK', delay: '6s', duration: '54s', x: '40%', y: '5%' },
  { text: 'CODE++', delay: '0s', duration: '51s', x: '90%', y: '25%' },
  { text: 'INSPIHER', delay: '3s', duration: '56s', x: '15%', y: '25%' },
  { text: 'FORKTOBER', delay: '6s', duration: '49s', x: '75%', y: '5%' },
  { text: 'SUMMER BOOTCAMP', delay: '0s', duration: '53s', x: '35%', y: '40%' },
  { text: 'LEARN2AUGMENT', delay: '3s', duration: '57s', x: '50%', y: '30%' },
  { text: 'UNIPOOL', delay: '6s', duration: '46s', x: '65%', y: '20%' },
  { text: 'CLI-TOP', delay: '0s', duration: '59s', x: '8%', y: '15%' },
  { text: 'CLI-RPG', delay: '3s', duration: '50s', x: '82%', y: '45%' },
  { text: 'EXAMCOOKER', delay: '6s', duration: '55s', x: '45%', y: '15%' },
  { text: 'LOCALHOST', delay: '0s', duration: '48s', x: '20%', y: '40%' },
  { text: 'ACM', delay: '3s', duration: '52s', x: '55%', y: '45%' },
]

export const FloatingWords: React.FC = () => {
  return (
    <div aria-hidden="true" className="floating-words-container">
      {FLOATING_WORDS.map((item, index) => (
        <span
          key={index}
          className="floating-word"
          style={
            {
              '--delay': item.delay,
              '--duration': item.duration,
              '--x': item.x,
              '--y': item.y,
            } as React.CSSProperties
          }
        >
          {item.text}
        </span>
      ))}
    </div>
  )
}
