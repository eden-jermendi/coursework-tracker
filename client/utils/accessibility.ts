import { useEffect, RefObject } from 'react'

export function useFocusTrap(
  ref: RefObject<HTMLElement>,
  isOpen: boolean,
  onClose: () => void,
) {
  useEffect(() => {
    if (!isOpen || !ref.current) return

    const selector =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    const updateFocus = () => {
      if (!ref.current) return
      const focusableElements = Array.from(
        ref.current.querySelectorAll<HTMLElement>(selector),
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      // Prioritize focusing the first form field (input, select, textarea)
      // otherwise fallback to the first focusable element (likely the close button)
      const firstField = focusableElements.find((el) =>
        ['INPUT', 'SELECT', 'TEXTAREA'].includes(el.tagName),
      )
      
      if (firstField) {
        firstField.focus()
      } else {
        firstElement.focus()
      }

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return

        const focusable = Array.from(
          ref.current?.querySelectorAll<HTMLElement>(selector) || [],
        )
        if (focusable.length === 0) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === last) {
            first.focus()
            e.preventDefault()
          }
        }
      }

      const handleEscKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }

      document.addEventListener('keydown', handleTabKey)
      document.addEventListener('keydown', handleEscKey)

      return () => {
        document.removeEventListener('keydown', handleTabKey)
        document.removeEventListener('keydown', handleEscKey)
      }
    }

    const timer = setTimeout(updateFocus, 100) // Increased delay slightly for animations
    return () => clearTimeout(timer)
  }, [isOpen, ref, onClose])
}
