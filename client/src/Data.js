export const endpoints = {
  about: 'about',
  contact: 'contact',
  home: 'home',
  skills: 'skills',
  work: 'work'
}

export const workImgPath = '../img/work/'
export const workVideoPath = '../video/work/'
export const orientationSwap = 720
export const navSwap = 1000
export const api =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API
    : 'http://localhost:8080/api'

export const pageTransition = {
  variants: {
    initial: {
      scale: 0,
      opacity: 0
    },
    in: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        delayChildren: 0.5,
        staggerChildren: 0.1
      }
    },
    out: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 1
      }
    }
  }
}

export const textAnimation = {
  variants: {
    initial: {
      y: '50%',
      x: '-50%'
    },
    in: {
      y: 0,
      x: '-50%',
      transition: {
        duration: 1,
        delay: 0.5
      }
    }
  }
}

export const mediaAnimation = {
  variants: {
    initial: {
      x: -3000
    },
    in: {
      x: '-50%',
      transition: {
        duration: 1,
        delay: 0.5
      }
    },
    out: {
      x: 3000,
      transition: {
        duration: 1
      }
    }
  }
}

export const projectVariants = {
  initial: {
    y: 1000
  },
  in: {
    y: 0,
    transition: {
      duration: 1,
      delay: 0.5
    }
  },
  out: {
    x: 2000,
    transition: {
      duration: 1
    }
  }
}

export const flashVariants = {
  initial: {
    y: -500,
    x: '-50%'
  },
  in: {
    y: 0,
    x: '-50%',
    transition: {
      type: 'spring'
    }
  },
  out: {
    y: -500,
    x: '-50%',
    transition: {
      type: 'spring'
    }
  }
}
