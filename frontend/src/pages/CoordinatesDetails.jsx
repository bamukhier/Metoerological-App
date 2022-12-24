import { Link, useParams, useLocation } from "react-router-dom";
import { Button, Box, VStack, Heading, Text, Spacer } from "@chakra-ui/react";
import {FaArrowLeft} from 'react-icons/fa'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

function CoordinatesDetails() {
    const {coordsId} = useParams()
    const location = useLocation()
    const toast = useToast()
    const lat = location.state?.lat
    const long = location.state?.long
    const [htmlURLs, setHtmlURLs] = useState([])
    const weatherParams = ['Temperature', 'Precipitation', 'Wind Speed', 'Wind Direction', 'Weather Icon']

    const queryURLBuilder = () => {
        const mateomaticsToken = process.env.REACT_APP_MATEOMATICS_TOKEN
        const weatherParams = ['t_2m:C','precip_1h:mm','wind_speed_10m:ms','wind_dir_10m:d','weather_symbol_1h:idx']
        const todayStart = new Date(new Date().setUTCHours(0,0,0,0)).toISOString()
        const tomorrowStart = new Date(new Date().setUTCHours(0,0,0,0) + 24 * 60 * 60 * 1000).toISOString()
        const timeInterval = `${todayStart}--${tomorrowStart}:PT1H`
        return weatherParams.map(param => `https://api.meteomatics.com/${timeInterval}/${param}/${lat},${long}/html?access_token=${mateomaticsToken}`)
    }

    const fetchHourlyWeather = async () => {
        const reqURLs = queryURLBuilder()
        try {
            const res = await axios.get(reqURLs[0])
            if (res.data){
                setHtmlURLs(reqURLs)
            }            
        } catch (err) {
            console.log(err)
            toast({
            status: 'error',
            title: 'Encountered an error while fetching data. Please refresh the page',
            description: err.message,
            duration: '5000'
            })
        }
    }

    useEffect( () => {
        if (lat && long){
            fetchHourlyWeather()
        }
    }, [lat, long])

    return (
        <Box flex width='100%' maxWidth={{base: '90vw', md: '70vw', xl: '50vw'}}>
            <Box mt={8}>
                <Link to='/'>
                    <Button leftIcon={<FaArrowLeft />} borderRadius='8px' alignSelf='flex-start'>Homepage</Button>
                </Link>
            </Box>
            <VStack p={2} >
                {!lat && !long ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Heading as='h1' mb='4' fontWeight='bold' size='lg' >Hourly Weather Data</Heading>
                        <Heading as='h2' mb='8' size='sm' fontWeight='normal' >Latitude: <Text fontWeight='bold' display='inline'>{lat}</Text> - Longitude: <Text fontWeight='bold' display='inline'>{long}</Text> </Heading>
                        <Heading as='h3' mb='12' fontWeight='thin' size='xs' >{new Date().toLocaleDateString("en-GB", {weekday: 'long', day: 'numeric', month: 'short', year: 'numeric'})} </Heading>
                        <Spacer />
                        <Box width='100%' >
                            {htmlURLs.map((url, i) => (
                                <Box key={i}>
                                    <Text fontWeight='semibold' mt='12' mb='2' textAlign='center'>{weatherParams[i]}</Text>
                                    <iframe title='hourly-weather' src={url} height='475px' width='100%' scrolling='no' />
                                </Box>
                            ))}
                        </Box>
                    </>
            )} 

            </VStack>
        </Box>
    )
}

export default CoordinatesDetails