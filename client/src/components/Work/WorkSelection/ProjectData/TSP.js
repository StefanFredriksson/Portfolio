import { workImgPath as imgPath } from '../../../../Data'

const description = `This project was for a university course in artificial intelligence. The goal was to create a genetic algorithm that could find a good solution to
the travelling salesman problem. I implemented my solution using C++ as the language and OpenGL as the GUI. I added a 100ms pause in the videos, by putting the thread to sleep, 
everytime it finds an improved solution, so that it's easier to see how the solution improves. The white square indicate the start and end city.`

export const tsp = {
  description,
  thumbnail: `${imgPath}tsp/thumbnail.png`,
  folder: 'tsp/',
  images: [
    'thumbnail.png',
    'i30c20g100000r5p.png',
    'i30c20g100000r5.png',
    'i30c50g100000r5p.png',
    'thumbnail.png',
    'i30c20g100000r5p.png',
    'i30c20g100000r5.png',
    'i30c50g100000r5p.png',
    'thumbnail.png',
    'i30c20g100000r5p.png',
    'i30c20g100000r5.png',
    'i30c50g100000r5p.png',
    'thumbnail.png',
    'i30c20g100000r5p.png',
    'i30c20g100000r5.png',
    'i30c50g100000r5p.png'
  ],
  videos: [
    { thumbnail: 'i30c20g100000r5p.png', src: 'i30c20g100000r5p.mp4' },
    { thumbnail: 'i30c20g100000r5.png', src: 'i30c20g100000r5.mp4' },
    { thumbnail: 'i30c50g100000r5p.png', src: 'i30c50g100000r5p.mp4' }
  ],
  title: 'Travelling Salesman Problem'
}
