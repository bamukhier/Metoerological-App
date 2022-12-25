import { useState, useEffect } from "react"
import { Drawer, DrawerOverlay, DrawerHeader, DrawerBody, DrawerContent, DrawerCloseButton, Box, Input, Text, useToast, InputGroup, InputLeftElement, Divider, Center, LinkBox } from "@chakra-ui/react"
import axios from "axios"
import { useDebounce } from "use-debounce";
import { FaSearch } from 'react-icons/fa'
import LoadingSpinner from "./LoadingSpinner"
import SearchListItem from "./SearchListItem"
import { Link } from "react-router-dom";

function SearchDrawer({isOpen, onClose}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [loadingResults, setLoadingResults] = useState(false)
    const toast = useToast()

    // this is for debouncing the changing text from making unnecessary requests while typing
    const [debouncedSearchText] = useDebounce(searchTerm, 1500)


        const handleSearchCoords = async () => {
        if(!debouncedSearchText) {
            toast({
                title: 'Enter a latitude or longitude to find coordinates',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        if(debouncedSearchText.length < 2) {
            toast({
                title: 'Enter at least two digits of a latitude or longitude to find coordinates',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            return
        }
        const numLatOrLong = parseFloat(debouncedSearchText)
        if (isNaN(numLatOrLong)){
            toast({
                status: 'error',
                title: 'Enter valid numeric latitude and longitude in format (-)xx.xxxxxx',
                duration: 3000,
                isClosable: true

            })
            return
        }

        try {
            setLoadingResults(true)
            const {data} = await axios.get(`/api/findCoords/?search=${debouncedSearchText}`)
            setLoadingResults(false)
            setSearchResults(data)

        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to load search results, try again please',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
    }


    useEffect( () => {
        setSearchResults([])
        if (debouncedSearchText){
            handleSearchCoords()
        }
    }, [debouncedSearchText])

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement='left'>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>
                    Search Coordinates
                    <DrawerCloseButton />
                </DrawerHeader>
                <DrawerBody px={1}>
                    <Box d='flex' py={1}>
                          <InputGroup>
                            <InputLeftElement
                            pointerEvents='none'
                            children={<FaSearch style={{ color: "silver", fontSize: "1.5em" }} />}
                            />
                            <Input value={searchTerm} variant='filled' onChange={e => setSearchTerm(e.target.value.trim())} placeholder='Search by latitude or longitude'/>
                        </InputGroup>
                    </Box>

                    {loadingResults? (
                        <Center>
                            <Box px='auto'>
                                <LoadingSpinner />

                            </Box>
                        </Center>
                    ) : (
                            debouncedSearchText.length > 1 ? (
                                <>
                                    <Box pt={3}>
                                        <Text fontSize='lg' fontWeight='semibold' pt={1} px={1}>Your Coordinates</Text>
                                    </Box>
                                    <Box>
                                        {searchResults.Coordinate?.length > 0 ? searchResults.Coordinate.map(coords => (
                                            <LinkBox>
                                                <Link to={`/coordinates/${coords.id}`} state={{lat: coords.lat, long: coords.long}}>
                                                    <SearchListItem key={coords.id} coords={coords} />
                                                </Link>
                                            </LinkBox>
                                        
                                        )) : (
                                            <Text fontSize='lg' pt={2} fontStyle='italic'>No coordinates were found</Text>

                                        )}
                                    </Box>
                                    <Box pt={4} pb={1}>
                                        <Divider color="gray.700" />
                                        <Text fontSize='lg' fontWeight='semibold' pt={1} px={1}>Saudi Cities</Text>
                                    </Box>
                                    <Box>
                                        {searchResults.City?.length > 0 ? searchResults.City.map(coords => (
                                            <LinkBox>
                                                <Link to={`/cities/${coords.id}`} state={{lat: coords.lat, long: coords.long, nameEn: coords.name_en, nameAr: coords.name_ar}}>
                                                    <SearchListItem key={coords.id} coords={coords} isCity={true} />
                                                </Link>
                                            </LinkBox>
                                        )) : (
                                            <Text fontSize='lg' pt={2} fontStyle='italic'>No cities were found</Text>

                                        )} 
                                    </Box>
                                </>
                            ) : null
                    )}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default SearchDrawer