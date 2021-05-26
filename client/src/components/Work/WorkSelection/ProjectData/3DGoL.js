import { workImgPath as imgPath } from '../../../../Data'

const description = `This was a project that I created on my spare time. My inspiration for it was a 2D version of Game of Life that I had created 
shortly before this one during an artificial intelligence course assignment. My implementation uses a 40x40x40 matrix, the yellow cubes represent newly born "individuals" 
while the orange cubes represent "individuals" that survived from the previous generation.`

export const gol = {
  description,
  thumbnail: `${imgPath}3dgol/thumbnail.png`,
  folder: '3dgol/',
  images: [],
  videos: [
    { thumbnail: 'badreaction.png', src: 'badreaction.mp4' },
    { thumbnail: 'glider.png', src: 'glider.mp4' },
    { thumbnail: 'oscillator11.png', src: 'oscillator11.mp4' },
    { thumbnail: 'oscillator16.png', src: 'oscillator16.mp4' },
    { thumbnail: 'oscillator18.png', src: 'oscillator18.mp4' },
    { thumbnail: 'oscillator22.png', src: 'oscillator22.mp4' }
  ],
  title: '3D Game of Life'
}
