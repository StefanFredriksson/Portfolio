import React, { useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Images.css'
import { enlargeImage } from './imageLogic'
import { StateContext } from '../../../../../../Store'
import { mediaAnimation } from '../../../../../../Data'

export default function Images (props) {
  const { selected, setSelected, images, imgPath, folder, showImages } = props
  const [state, setState] = useContext(StateContext)

  return (
    <AnimatePresence>
      {showImages && (
        <motion.div
          key='images'
          id='project-image-container'
          className='media-container'
          initial='initial'
          animate='in'
          exit='out'
          variants={mediaAnimation.variants}
        >
          <div id='images'>
            {images.map((image, i) => {
              return (
                <div
                  className='small-image-container project-thumbnail'
                  key={i.toString()}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
