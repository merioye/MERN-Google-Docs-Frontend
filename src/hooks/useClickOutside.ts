import { useEffect, useRef } from 'react'

export const useClickOutside = (handler: () => void, isVisible: boolean) => {
  const modal = useRef() as React.RefObject<HTMLDivElement>

  useEffect(() => {
    if (isVisible) {
      const modalHandler = (e: any) => {
        if (!modal.current?.contains(e.target)) {
          if (e.target.id === 'options') {
            return
          }
          handler()
        }
      }
      document.addEventListener('mousedown', modalHandler)
      return () => {
        document.removeEventListener('mousedown', modalHandler)
      }
    }
  }, [])
  return modal
}
