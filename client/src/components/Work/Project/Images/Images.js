import React, { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Images.css'
import { enlargeImage, nextImages, prevImages } from './imageLogic'
import { StateContext } from '../../../../Store'
import { mediaAnimation } from '../../../../Data'

export default function Images (props) {
  const { selected, setSelected, images, imgPath, folder, showImages } = props
  const [state, setState] = useContext(StateContext)

  const next = event => {
    const offset = nextImages(state.imageNav.offset, images)
    state.imageNav.offset = offset
    setState({ ...state })
  }

  const previous = event => {
    if (state.imageNav.offset >= 0) return

    const offset = prevImages(state.imageNav.offset)
    state.imageNav.offset = offset
    setState({ ...state })
  }

  return (
    <AnimatePresence>
      {showImages && (
        <motion.div
          id='project-image-container'
          initial='initial'
          animate='in'
          exit='out'
          variants={mediaAnimation.variants}
        >
          <div id='images'>
            {images.map(image => {
              return (
                <div
                  className='small-image-container'
                  onClick={event => {
                    if (selected.state) return
                    const imgs = document.querySelectorAll(
                      '.small-image-container'
                    )
                    let ix = 0

                    for (let i = 0; i < imgs.length; i++) {
                      if (imgs[i] === event.currentTarget) {
                        ix = i
                        break
                      }
                    }

                    state.imageNav.ix = ix
                    setState({ ...state })
                    enlargeImage(
                      event.currentTarget,
                      `${imgPath}${folder}${image}`,
                      selected,
                      setSelected
                    )
                  }}
                >
                  <span className='view-media'>View image</span>
                  <img src={`${imgPath}${folder}${image}`} alt='' />
                </div>
              )
            })}
          </div>
          <div id='image-navigation'>
            <span onClick={previous}>&#60;</span>
            <span onClick={next}>&#62;</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
