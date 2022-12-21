import React from 'react'
import { VStack, HStack, Text, StackDivider, Spacer, Badge, Box } from "@chakra-ui/react";
import CreateOrEditModal from './CreateOrEditModal'

function CoordsList({coords, addCoords, updateCoords, deleteCoords}) {
    if (!coords.length){
        return (
            <Badge p={4} m={4} colorScheme='orange' borderRadius='xl'>Loading...</Badge>
        )
    }

    return (
        <Box flex width='100%' maxWidth={{base: '90vw', md: '70vw', xl: '50vw'}}>
            <Box mb='2' mt='8'>
                <CreateOrEditModal addCoords={addCoords} />
            </Box>
        <VStack divider={<StackDivider />} p='3' borderWidth='thin' borderColor='gray.200' 
            borderRadius='xl'  alignItems='stretch'>
            {coords.map( coord => {
                return (
                <HStack key={coord.id}>
                    <Text fontSize='lg' >{coord.lat} , {coord.long}</Text>
                    <Spacer />
                    <>
                        <CreateOrEditModal coords={coord} updateCoords={updateCoords} />
                        <CreateOrEditModal coords={coord} deleteMode={true} deleteCoords={deleteCoords} />
                    </>
                    
                </HStack>
            )})}
        </VStack>
        </Box>
    )
}

export default CoordsList
