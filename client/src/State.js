const colors = [
  { color: 'cyan', trail: 'hsla(171,98%,56%,0.25)' },
  { color: 'rgb(248, 47, 114)', trail: 'hsla(346,98%,56%,0.25)' }
]

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const ix = randomIntFromInterval(0, 1)

export const globalState = {
  color: colors[ix].color,
  trail: colors[ix].trail,
  path: '',
  imageNav: {
    offset: 0,
    ix: 0
  }
}
