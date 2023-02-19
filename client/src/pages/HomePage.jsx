import { Box, ButtonGroup } from '@chakra-ui/react'
import React, { useState } from 'react'
import ButtonComponent from '../components/Button'
import { useNavigate } from 'react-router-dom'
import AlertComponent from '../components/AlertComponent'

const HomePage = () => {
  const [isFetching,setIsFetching]=useState(false);
  const [dataFetchingAlert,setDataFetchingAlert]=useState(false);
  const [dataAlreadyFechedAlert,setDataAlreadyFetchedAlert]=useState(false);
  const [dataFetchedSuccess,setDataFetchedSuccess]=useState(false);
  const [deleteAlert,setDeleteAlert]=useState(false);
  const [dataNotFoundAlert,setDataNotFound]=useState(false);
  
  const navigate=useNavigate();
  const handleAlert=(setFunction)=>{
    setFunction(true);
    setTimeout(() => {
      setFunction(false);
    }, 3000);
  }

  const handleClick=async(e)=>{
    if( isFetching ){
      handleAlert(setDataFetchingAlert);
      return ;
    }
    if( e.target.name === 'Fetch Users' ){
      setIsFetching(true);
      try {
        let response = await fetch("https://cointab-server-t1qu.onrender.com/fetchData", {
          method: "GET",headers: { "Content-Type": "application/json" ,"Cache-Control":"no-cache"}});
        if( response.status === 304 ){
          handleAlert(setDataAlreadyFetchedAlert);
        }else if( response.status === 200 ){
          handleAlert(setDataFetchedSuccess);
        }
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    }
    if( e.target.name === 'Delete Users' ){
      try {
        let response = await fetch("https://cointab-server-t1qu.onrender.com/deleteData",{
          method: "DELETE", headers: { "Content-Type": "application/json" }});
        if( response.status === 200 ){
          handleAlert(setDeleteAlert);
        }else if( response.status === 404 ){
          handleAlert(setDataNotFound);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if( e.target.name === 'User Details' ){
      navigate("/user-details");
    }
  }


  return (
    <Box>
      <Box w="500px" h="50px" m="auto" marginTop="10px">
        {dataFetchingAlert ? <AlertComponent message={"Data fetching is already in progress Please wait !"} status="warning" /> : null}
        {dataAlreadyFechedAlert ? <AlertComponent message={"Data already fetched and stored!"} status="info" /> : null }
        {dataFetchedSuccess ? <AlertComponent message={"Data fetched and uploaded to the server. Fire on!"} status="success" /> : null }
        {deleteAlert ? <AlertComponent message={"Your whole data is going to Delete!"} status="error" /> : null }
        {dataNotFoundAlert ? <AlertComponent message={"Data doesn't exists please store data first!"} status="warning" /> : null }
      </Box>
      <ButtonGroup marginTop={"150px"} marginLeft={"400px"}>
        <ButtonComponent handleClick={handleClick} name={"Fetch Users"} />
        <ButtonComponent handleClick={handleClick} name={"Delete Users"} />
        <ButtonComponent handleClick={handleClick} name={"User Details"} />
      </ButtonGroup>
    </Box>
  )
}

export default HomePage