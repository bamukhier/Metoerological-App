import { Box, Badge, Spinner, Text } from "@chakra-ui/react"

function LoadingSpinner() {
    return (
        <Box pt={16} >
            <Badge p={8} colorScheme='gray' borderRadius='xl' textAlign='center'>
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

export default LoadingSpinner