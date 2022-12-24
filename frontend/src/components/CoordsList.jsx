import React from 'react'
import { Link } from "react-router-dom";
import { VStack, HStack, Text, StackDivider, Spacer, Box, LinkBox, LinkOverlay, Image } from "@chakra-ui/react";
import CreateOrEditOrDeleteModal from './CreateOrEditOrDeleteModal'
import LoadingSpinner from './LoadingSpinner'
function CoordsList({coords, addCoords, updateCoords, deleteCoords}) {
    if (!coords.length){
        return (
            <LoadingSpinner />
        )
    }

    return (
        <Box flex width='100%' maxWidth={{base: '90vw', md: '70vw', xl: '50vw'}}>
            <Box mb='2' mt='8'>
                <CreateOrEditOrDeleteModal addCoords={addCoords} />
            </Box>
        <VStack divider={<StackDivider />} p='3' borderWidth='thin' borderColor='gray.200' 
            borderRadius='xl'  alignItems='stretch'>
            {coords.map( coord => {
                return (
                <HStack key={coord.id}>
                    <LinkBox>
                        <Link to={`/coordinates/${coord.id}`} state={{lat: coord.lat, long: coord.long}}>
                            <LinkOverlay><Text fontSize='sm' >{coord.lat}, {coord.long}</Text></LinkOverlay>
                        </Link>  
                    </LinkBox>
                    <Spacer />
                        <LinkBox>
                            <Link to={`/coordinates/${coord.id}`} state={{lat: coord.lat, long: coord.long}}>
                                <Image src={`/weather-symbols/symbol-${coord.weatherSymbolNum}.png`} boxSize='48px' borderRadius='full' alt='weather symbol' />
                            </Link>
                        </LinkBox>
                        <LinkBox textAlign='center' pl='2'>
                            <Link to={`/coordinates/${coord.id}`} state={{lat: coord.lat, long: coord.long}}>
                                <Box><Text fontSize='xl' fontWeight='bold'>{coord.minTemp}&deg;</Text></Box>
                                <Box><Text fontSize='xs'>Min Temp</Text></Box>                     
                            </Link>
                        </LinkBox>
                        <LinkBox textAlign='center' pl='2'>
                            <Link to={`/coordinates/${coord.id}`} state={{lat: coord.lat, long: coord.long}}>
                                <Box><Text fontSize='xl' fontWeight='bold'>{coord.maxTemp}&deg;</Text></Box>
                                <Box><Text fontSize='xs'>Max Temp</Text></Box>
                            </Link>
                        </LinkBox>
                    <Spacer />
                    <>
                        <CreateOrEditOrDeleteModal coords={coord} updateCoords={updateCoords} />
                        <CreateOrEditOrDeleteModal coords={coord} deleteMode={true} deleteCoords={deleteCoords} />
                    </>
                    
                </HStack>
            )})}
        </VStack>
        </Box>
    )
}

export default CoordsList
