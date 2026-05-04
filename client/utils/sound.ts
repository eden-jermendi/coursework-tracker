export const playSuccessSound = () => {
  const audio = new Audio('/audio/success_bell.mp3')
  audio.play().catch((error) => {
    console.error('Error playing success sound:', error)
  })
}
