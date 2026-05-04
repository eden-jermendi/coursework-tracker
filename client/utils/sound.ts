export const playSuccessSound = () => {
  const audio = new Audio('/audio/success_bell.mp3')
  audio.play().catch((error) => {
    console.error('Error playing success sound:', error)
  })
}

export const playLaughSound = () => {
  const audio = new Audio('/audio/short-high-pitched-laugh.mp3')
  audio.play().catch((error) => {
    console.error('Error playing laugh sound:', error)
  })
}
