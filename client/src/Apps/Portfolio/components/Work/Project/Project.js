import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Project.css'
import { workImgPath as imgPath, projectVariants } from '../../../../../Data'
import SelectedImage from './Images/SelectedImage/SelectedImage'
import Images from './Images/Images'
import Navigation from './Navigation/Navigation'
import Videos from './Videos/Videos'
import SelectedVideo from './Videos/SelectedVideo/SelectedVideo'
import MediaNavigation from './MediaNavigation/MediaNavigation'

export default function Project (props) {
  const { folder, images, videos, title, description } = props.project
  const [selectedImage, setSelectedImage] = useState({
    state: false,
    width: 0,
    height: 0,
    div: null
  })
  const [selectedVideo, setSelectedVideo] = useState({ state: false, src: '' })
  const [showImages, setShowImages] = useState(true)

  return (
    <AnimatePresence exitBeforeEnter>
      {props.showProject && (
        <motion.div
          key='project'
          variants={projectVariants}
          initial='initial'
          animate='in'
          exit='out'
          id='main-project-container'
        >
          <SelectedImage
            images={images}
            selected={selectedImage}
            setSelected={setSelectedImage}
            imgPath={imgPath}
            folder={folder}
          />
          {selectedVideo.state ? (
            <SelectedVideo
              src={selectedVideo.src}
              selected={selectedVideo}
              setSelected={setSelectedVideo}
            />
          ) : (
            ''
          )}
          <div
            id='inner-project-container'
            className={`${selectedVideo.state ? 'blur' : ''}`}
          >
            <div id='project-description'>
              <h1>{title}</h1>
              <h3>{description}</h3>
            </div>

            <div id='outer-media-container'>
              <AnimatePresence exitBeforeEnter>
                <Images
                  images={images}
                  showImages={showImages}
                  selected={selectedImage}
                  setSelected={setSelectedImage}
                  folder={folder}
                  imgPath={imgPath}
                />
                <Videos
                  showImages={showImages}
                  videos={videos}
                  folder={folder}
                  selected={selectedVideo}
                  setSelected={setSelectedVideo}
                />
              </AnimatePresence>
              <MediaNavigation
                showImages={showImages}
                images={images}
                videos={videos}
              />

              <Navigation
                setShowProject={props.setShowProject}
                showImages={showImages}
                setShowImages={setShowImages}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
