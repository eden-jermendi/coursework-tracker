export const playSuccessSound = () => {
  const audio = new Audio('/audio/success_bell.mp3')
  audio.play().catch((error) => {
    console.error('Error playing success sound:', error)
  })
}

export const playLaughSound = () => {
  const laughSounds = [
    '/audio/short-high-pitched-laugh.mp3',
    '/audio/artificiallyinspired-90s-sitcom-laugh-track-v2-353986.mp3',
    '/audio/digitalstore07-evil-laughing-430367.mp3',
    '/audio/digitalstore07-laughing-430442.mp3',
    '/audio/dragon-studio-witch-laugh-401713.mp3',
    '/audio/freesound_community-weird-laughter-3-98459.mp3',
  ]
  const randomLaugh =
    laughSounds[Math.floor(Math.random() * laughSounds.length)]
  const audio = new Audio(randomLaugh)
  audio.play().catch((error) => {
    console.error('Error playing laugh sound:', error)
  })
}
