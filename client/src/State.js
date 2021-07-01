const colors = [
  { color: 'cyan', trail: 'hsla(171,98%,56%,0.25)' },
  { color: 'rgb(248, 47, 114)', trail: 'hsla(346,98%,56%,0.25)' },
  { color: 'yellow', trail: 'hsla(64, 98%, 56%, 0.25)' },
  { color: 'limegreen', trail: 'hsla(140, 98%, 56%, 0.25)' },
  { color: 'rgb(128, 0, 255)', trail: 'hsla(255, 98%, 56%, 0.25)' }
]

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const ix = randomIntFromInterval(0, colors.length - 1)

export const globalState = {
  color: colors[ix].color,
  trail: colors[ix].trail,
  path: '',
  imageNav: {
    offset: 0,
    ix: 0
  },
  navSwap: 1000,
  navWidth: 70,
  firstTime: true
}
