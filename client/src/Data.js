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

export const pageTransition = {
  variants: {
    initial: {
      y: '-100vh',
      scale: 0.1
    },
    in: {
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        delayChildren: 0.5,
        staggerChildren: 0.1
      }
    },
    out: {
      x: '100vw',
      scale: 0.1,
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
      x: -3000,
      y: '-50%'
    },
    in: {
      x: '-50%',
      y: '-50%',
      transition: {
        duration: 1,
        delay: 0.5
      }
    },
    out: {
      x: 3000,
      y: '-50%',
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
