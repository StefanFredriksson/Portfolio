import React, { useState } from 'react'
import './Project.css'
import { workImgPath as imgPath } from '../../../Data'
import SelectedImage from './Images/SelectedImage/SelectedImage'
import Images from './Images/Images'

export default function Project (props) {
  const { folder, images, title } = props.project
  const [selected, setSelected] = useState({
    state: false,
    width: 0,
    height: 0,
    div: null
  })

  return (
    <div id='main-project-container'>
      <SelectedImage
        images={images}
        selected={selected}
        setSelected={setSelected}
        imgPath={imgPath}
        folder={folder}
      />
      <Images
        title={title}
        images={images}
        selected={selected}
        setSelected={setSelected}
        folder={folder}
        imgPath={imgPath}
      />
    </div>
  )
}
