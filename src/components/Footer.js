import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <div>
      <Foot>
        Secret Stories | Copyright 2022 | All Rights Reserved
      </Foot>
    </div>
  )
}

export default Footer

//styling
const Foot = styled.footer`
text-align: center;
padding: 2%;
background: black;
color: white;
`