import React from 'react'
import { VStack, HStack, Text, StackDivider, Spacer, Badge, Box, Image, Spinner } from "@chakra-ui/react";
import CreateOrEditOrDeleteModal from './CreateOrEditOrDeleteModal'

function CoordsList({coords, addCoords, updateCoords, deleteCoords}) {
    if (!coords.length){
        return (
            <Box pt={16} >
                <Badge p={8} colorScheme='gray' borderRadius='xl'>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                    <Box><Text mt='4' fontWeight='medium'>Loading...</Text></Box>
                    
                </Badge>
            </Box>
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
                    <Box>
                        <Text fontSize='sm' >{coord.lat}, {coord.long}</Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Image src={`/weather-symbols/symbol-${coord.weatherSymbolNum}.png`} boxSize='48px' borderRadius='full' alt='weather symbol' />
                    </Box>
                    <Box textAlign='center' pl='2'>
                        <Box><Text fontSize='xl' fontWeight='bold'>{coord.minTemp}&deg;</Text></Box>
                        <Box><Text fontSize='xs'>Min Temp</Text></Box>
                    </Box>
                    <Box textAlign='center' pl='2'>
                        <Box><Text fontSize='xl' fontWeight='bold'>{coord.maxTemp}&deg;</Text></Box>
                        <Box><Text fontSize='xs'>Max Temp</Text></Box>
                    </Box>
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
