import React, { useState } from 'react'
import './Project.css'
import { workImgPath as imgPath } from '../../../Data'
import SelectedImage from './Images/SelectedImage/SelectedImage'
import Images from './Images/Images'
import Navigation from './Navigation/Navigation'
import Videos from './Videos/Videos'
import SelectedVideo from './Videos/SelectedVideo/SelectedVideo'

export default function Project (props) {
  const { folder, images, videos, title } = props.project
  const [selectedImage, setSelectedImage] = useState({
    state: false,
    width: 0,
    height: 0,
    div: null
  })
  const [selectedVideo, setSelectedVideo] = useState({ state: false, src: '' })
  const [showImages, setShowImages] = useState(false)

  return (
    <div id='main-project-container'>
      <SelectedImage
        images={images}
        selected={selectedImage}
        setSelected={setSelectedImage}
        imgPath={imgPath}
        folder={folder}
      />
      {selectedVideo.state ? <SelectedVideo src={selectedVideo.src} /> : ''}
      <div
        id='inner-project-container'
        className={`${selectedVideo.state ? 'blur' : ''}`}
      >
        <div id='project-title'>
          <h1>{title}</h1>
        </div>
        {showImages ? (
          <Images
            images={images}
            selected={selectedImage}
            setSelected={setSelectedImage}
            folder={folder}
            imgPath={imgPath}
          />
        ) : (
          <Videos
            videos={videos}
            folder={folder}
            selected={selectedVideo}
            setSelected={setSelectedVideo}
          />
        )}

        <Navigation
          setShowProject={props.setShowProject}
          setShowImages={setShowImages}
        />
      </div>
    </div>
  )
}
