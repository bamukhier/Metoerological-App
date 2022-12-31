import React from 'react'
import { Link } from "react-router-dom";
import { VStack, HStack, Text, StackDivider, Spacer, Box, LinkBox, Image, useDisclosure, Button, Center, Flex, Tooltip } from "@chakra-ui/react";
import CreateOrEditOrDeleteModal from './CreateOrEditOrDeleteModal'
import LoadingSpinner from './LoadingSpinner'
import { FaSearch } from 'react-icons/fa';
import SearchDrawer from './SearchDrawer';
import SimplePaginator from './SimplePaginator';
import EmptyPlaceholder from './EmptyPlaceholder';

function CoordsList({coords, isLoading, fetchCoords, handleOffsetChange, addCoords, updateCoords, deleteCoords}) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <Box flex width='100%' maxWidth={{base: '90vw', md: '75vw', xl: '60vw'}}>
            <Box mb='2' mt='8' ml='1'>
                <CreateOrEditOrDeleteModal addCoords={addCoords} />
                <Button ml={2} px={6} colorScheme='facebook'variant='outline' leftIcon={<FaSearch />} onClick={onOpen} fontSize='lg'>
                        Search
                </Button>
            </Box>
        <VStack divider={<StackDivider />} p='3' mb='2' borderWidth='thin' borderColor='gray.200' 
            borderRadius='xl'  alignItems='stretch'>
            {isLoading ? <Flex justify="center" align="center"><LoadingSpinner /></Flex> : coords.length ? coords.map( coord => {
                return (
                <HStack key={coord.id}>
                    <LinkBox maxWidth='200px'>
                        <Link to={`/coordinates/${coord.id}`} state={{lat: coord.lat, long: coord.long, label: coord.label}}>
                            <Text fontSize='sm' fontWeight='bold' noOfLines={1} >{coord.label}</Text>
                            <Text fontSize='sm' >{coord.lat}, {coord.long}</Text>
                        </Link>  
                    </LinkBox>
                    <Spacer />
                        <LinkBox>
                            <Link to={`/coordinates/${coord.id}`} state={{lat: coord.lat, long: coord.long, label: coord.label}}>
                                <Image src={`/weather-symbols/symbol-${coord.weatherSymbolNum}.png`} boxSize='48px' borderRadius='full' alt='weather symbol' />
                            </Link>
                        </LinkBox>
                        <LinkBox textAlign='center' pl='2'>
                            <Link to={`/coordinates/${coord.id}`} state={{lat: coord.lat, long: coord.long, label: coord.label}}>
                                <Box><Text fontSize='xl' fontWeight='bold'>{coord.minTemp}&deg;</Text></Box>
                                <Box><Text fontSize='xs'>Min Temp</Text></Box>                     
                            </Link>
                        </LinkBox>
                        <LinkBox textAlign='center' pl='2'>
                            <Link to={`/coordinates/${coord.id}`} state={{lat: coord.lat, long: coord.long, label: coord.label}}>
                                <Box><Text fontSize='xl' fontWeight='bold'>{coord.maxTemp}&deg;</Text></Box>
                                <Box><Text fontSize='xs'>Max Temp</Text></Box>
                            </Link>
                        </LinkBox>
                    <Spacer />
                    <>
                        <Tooltip label="Edit Coordinates" aria-label='A tooltip'>
                            <CreateOrEditOrDeleteModal coords={coord} updateCoords={updateCoords} />                            
                        </Tooltip>
                        <Tooltip label="Delete Coordinates" aria-label='A tooltip'>
                            <CreateOrEditOrDeleteModal coords={coord} deleteMode={true} deleteCoords={deleteCoords} />                          
                        </Tooltip>
                       
                    </>
                    
                </HStack>
            )}) 
                : <Flex justify="center" align="center"><EmptyPlaceholder /></Flex>
            }
        </VStack>
        <SearchDrawer isOpen={isOpen} onClose={onClose} isLoading={isLoading} />
        <SimplePaginator fetchCoords={fetchCoords} handleOffsetChange={handleOffsetChange} />
        </Box>
    )
}

export default CoordsList
