import { ButtonGroup } from '@chakra-ui/react'
import React from 'react'
import ButtonComponent from '../components/Button'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate=useNavigate();
  const handleClick=(e)=>{
    const { name }=e.target;
    if( name === 'User Details' ){
      navigate("/user-details")
    }

  }
  return (
    <ButtonGroup marginTop={"250px"} marginLeft={"400px"}>
        <ButtonComponent handleClick={handleClick} name={"Fetch Users"} />
        <ButtonComponent handleClick={handleClick} name={"Delete Users"} />
        <ButtonComponent handleClick={handleClick} name={"User Details"} />
    </ButtonGroup>
  )
}

export default HomePage