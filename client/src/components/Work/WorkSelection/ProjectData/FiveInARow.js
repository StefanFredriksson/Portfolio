import { workImgPath as imgPath } from '../../../../Data'

const description = `This was a project that I made for an artificial intelligence course. The AI makes use of the Minimax algorithm when deciding its moves.
The AI is not perfect, which some of the videos show, but it is quite difficult to beat when playing for fun. I used C++ as the programming language and 
OpenGL as the GUI framework.`

export const fiveInARow = {
  description,
  thumbnail: `${imgPath}fiveinarow/thumbnail.png`,
  folder: 'fiveinarow/',
  images: ['1.png', '2.png', '3.png', '4.png'],
  videos: [
    { thumbnail: '1.png', src: '1.mp4' },
    { thumbnail: '2.png', src: '2.mp4' },
    { thumbnail: '3.png', src: '3.mp4' },
    { thumbnail: '4.png', src: '4.mp4' }
  ],
  title: 'Five in a Row'
}
