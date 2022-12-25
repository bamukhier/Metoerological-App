import { Box, Text, useColorMode } from '@chakra-ui/react'

const SearchListItem = ({coords, isCity}) => {
    const {colorMode} = useColorMode()

    return (
        <Box cursor='pointer' bg={colorMode === 'light' ? 'gray.100' : 'gray.600'} 
        color={colorMode === 'light' ? 'gray.600' : 'whiteAlpha.800'} _hover={{bg: 'gray.600', color: 'white',}} 
                    w='100%' d='flex' alignItems='center' p={2} my={2} borderRadius='md'>
                <Box>
                    {isCity && <Text fontSize='xs'>City:<Text fontWeight='bold'>{coords.name_en} - {coords.name_ar}</Text></Text>}
                    <Text fontSize='xs'>Latitude:<Text fontWeight='bold'>{coords.lat}</Text></Text>
                    <Text fontSize='xs'>Longitude:<Text fontWeight='bold'>{coords.long}</Text></Text>
                </Box>
        </Box>
    )
}

export default SearchListItem