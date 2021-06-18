import React from 'react'
import './BackgroundShape.css'

export default function BackgroundShape () {
  return (
    <div id='background-shape'>
      <svg version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 1000 300'>
        <filter id='AI_Shadow_1' filterUnits='objectBoundingBox'>
          <feGaussianBlur
            in='SourceAlpha'
            stdDeviation='2'
            result='blur'
          ></feGaussianBlur>
          <feOffset
            dx='4'
            dy='4'
            in='blur'
            result='offsetBlurredAlpha'
          ></feOffset>
          <feMerge>
            <feMergeNode in='offsetBlurredAlpha'></feMergeNode>
            <feMergeNode in='SourceGraphic'></feMergeNode>
          </feMerge>
        </filter>
        <g id='XMLID_154_' class='background-st0'>
          <path
            id='XMLID_159_'
            class='background-st1'
            d='M0,168.3c0,0,129.7,142,288.3,0c0,0,118.7-150,248,0s274,44,274,44s99.7-80,189.7,5.3V-42H0
		V168.3z'
          />
          <path
            id='XMLID_157_'
            class='background-st2'
            d='M0,168.3c0,0,129.7,142,288.3,0c0,0,118.7-150,248,0s274,44,274,44s99.7-80,189.7,5.3V-42H0
		V168.3z'
          />
        </g>
        <g id='XMLID_153_' class='background-st0'>
          <path
            id='XMLID_164_'
            class='background-st3'
            d='M0,129.9c0,0,131.7,141.7,290.3-0.3c0,0,118.7-150,248,0s274,44,274,44s99.7-80,189.7,5.3
		l-2-221H0L0,129.9z'
          />
          <path
            id='XMLID_155_'
            class='background-st2'
            d='M0,129.9c0,0,131.7,141.7,290.3-0.3c0,0,118.7-150,248,0s274,44,274,44s99.7-80,189.7,5.3
		l-2-221H0L0,129.9z'
          />
        </g>
      </svg>
    </div>
  )
}
