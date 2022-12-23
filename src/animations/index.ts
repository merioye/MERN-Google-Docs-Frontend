export const authFormVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, y: 30, transition: { duration: 1 } },
}

export const modalVariants = {
  visible: { scale: 1 },
  hidden: { scale: 0 },
}

export const documentsListVariants = {
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
  hidden: {
    opacity: 0,
  },
}
export const documentListItemVariants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    y: 20,
    opacity: 0,
  },
}
