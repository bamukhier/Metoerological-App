import { Box, Text, useColorMode } from '@chakra-ui/react'

const SearchListItem = ({coords, isCity}) => {
    const {colorMode} = useColorMode()

    return (
        <Box cursor='pointer' bg={colorMode === 'light' ? 'gray.200' : 'gray.600'} 
        color={colorMode === 'light' ? 'gray.700' : 'whiteAlpha.800'} _hover={{bg: 'gray.600', color: 'white',}} 
                    w='100%' d='flex' alignItems='center' p={2} my={2} borderRadius='md'>
                <Box>
                    {isCity ? 
                        <Text fontSize='sm'>City: <Text fontWeight='semibold' as="span">{coords.name_en} - {coords.name_ar}</Text></Text>
                    : 
                        <Text fontSize='sm'>Label: <Text fontWeight='semibold' as="span">{coords.label}</Text></Text>

                    }
                    <Text fontSize='sm'>Latitude: <Text fontWeight='semibold' as="span">{coords.lat}</Text></Text>
                    <Text fontSize='sm'>Longitude: <Text fontWeight='semibold' as="span">{coords.long}</Text></Text>
                </Box>
        </Box>
    )
}

export default SearchListItem