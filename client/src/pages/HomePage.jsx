import { ButtonGroup } from '@chakra-ui/react'
import React from 'react'
import ButtonComponent from '../components/Button'

const HomePage = () => {
  return (
    <ButtonGroup marginTop={"250px"} marginLeft={"400px"}>
        <ButtonComponent name={"Fetch Users"} />
        <ButtonComponent name={"Delete Users"} />
        <ButtonComponent name={"User Details"} />
    </ButtonGroup>
  )
}

export default HomePage