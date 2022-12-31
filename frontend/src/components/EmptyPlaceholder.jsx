import { Box, Badge, Text, Icon } from "@chakra-ui/react"
import { BsBox } from "react-icons/bs"

function EmptyPlaceholder() {
    return (
        <Box p={4} >
            <Badge p={8} colorScheme='gray' borderRadius='xl' textAlign='center' textTransform="capitalize">
                <Icon
                    as={BsBox}
                    boxSize={12}
                                       
                />
                <Box mx={2}><Text mt='4' fontWeight='medium' fontSize='lg'>There is Nothing Here</Text></Box>
                
            </Badge>
        </Box>
    )

}

export default EmptyPlaceholder