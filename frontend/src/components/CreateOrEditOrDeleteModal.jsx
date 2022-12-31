import { useState, useEffect } from 'react';
import { useDisclosure, useToast, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Input, Tooltip } from '@chakra-ui/react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const CreateOrEditOrDeleteModal = ({coords, addCoords, deleteMode, updateCoords, deleteCoords}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    const [label, setLabel] = useState()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    const validateCoords = (label, lat, long) => {
        if (!label || !lat || !long) {
            toast({
                status: 'error',
                title: 'All field are required. Enter any missing field',
                duration: '5000'
            })
            return false
        }
        const numLat = parseFloat(lat)
        const numLong = parseFloat(long)
        if (isNaN(numLat) || isNaN(numLong)){
            toast({
                status: 'error',
                title: 'Enter valid numeric latitude and longitude',
                duration: '5000'
            })
            return false
        }

        const isLatitude = numLat => isFinite(numLat) && Math.abs(numLat) <= 90;
        const isLongitude = numLong => isFinite(numLong) && Math.abs(numLong) <= 180;

        if (!isLatitude(numLat) || !isLongitude(numLong)){
            toast({
                status: 'error',
                title: 'Enter latitude and longitude in the valid range',
                description: 'latitude must be in the range (-90, 90) and longitude must be in the range (-180, 180)',
                duration: '5000'
            })
            return false
        }

        return {label, lat: numLat.toFixed(6), long: numLong.toFixed(6)}

    }

    const handleEdit = async (id, label, latitude, longitude) => {
        const validatedCoords = validateCoords(label, latitude, longitude)
        if (!validatedCoords){
            return
        } else {
            await updateCoords(id, validatedCoords)
            toast({
                status: 'success',
                title: 'Coordinates Updated Successfully',
                duration: '5000'
            })
            setLatitude('')
            setLongitude('')
            setLabel('')
            onClose()
        }

    }

    const handleDelete = async (id) => {
        await deleteCoords(id)
        toast({
            status: 'success',
            title: 'Coordinates Deleted Successfully',
            duration: '5000'
        })
        onClose()
    }

    const handleAdd = async (label, latitude, longitude) => {
        const validatedCoords = validateCoords(label, latitude, longitude)
        if (!validatedCoords){
            return
        } else {
            await addCoords(validatedCoords)
            toast({
                status: 'success',
                title: 'New Coordinates Added Successfully',
                duration: '5000'
            })
            setLatitude('')
            setLongitude('')
            setLabel('')
            onClose()
        }
    }

    useEffect(() => {
        if (coords){
            setLabel(coords.label)
            setLatitude(coords.lat)
            setLongitude(coords.long)
        }

    }, [coords])

  return (
    <>
        {coords && !deleteMode
        ?   <Tooltip label="Edit Coordinates" aria-label='A tooltip'>                     
                <IconButton mx='8' icon={<FaEdit />} isRound='true' onClick={onOpen}/>
            </Tooltip>
        : coords && deleteMode 
        ?   <Tooltip label="Delete Coordinates" aria-label='A tooltip'>  
                <IconButton icon={<FaTrash />} isRound='true' onClick={onOpen}/>
            </Tooltip>
        : <Button leftIcon={<FaPlus />} type='submit' bg="green.500" _hover={{bg: "green.700",}} color='white' px='5' onClick={onOpen}>Add New</Button>
        }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{coords && !deleteMode ? 'Edit Coordinates' : coords && deleteMode ? 'Delete Coordinates' : 'Add Coordinates'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              {!deleteMode
              ? (
                <>
                <Box>
                    Label: <Input tabIndex='1' variant='filled' mt='1' mb='3' placeholder='a descriptive name' value={label} onChange={(e) => setLabel(e.target.value)}/>
                </Box>
                <Box mt='2'>
                    Latitude: <Input tabIndex='2' variant='filled' mt='1' mb='3' placeholder='in format (-)xx.xxxxxx' value={latitude} onChange={(e) => setLatitude(e.target.value.trim())}/>
                </Box>
                <Box mt='2'>
                    Longitude: <Input tabIndex='3' variant='filled' mt='1' mb='3' placeholder='in format (-)xx.xxxxxx' value={longitude} onChange={(e) => setLongitude(e.target.value.trim())}/>
                </Box>
                </>
              ) : (
                <Box>
                    Are you sure you want to delete these coordinates?
                </Box>
              )}
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={deleteMode? "red" : "green"}
              onClick={ 
                  coords && !deleteMode ? 
                  () => {handleEdit(coords.id, label, latitude, longitude)} 
                  : coords && deleteMode ? () => {handleDelete(coords.id)} 
                                : () => {handleAdd(label, latitude, longitude)}
            }
            >
              {coords && !deleteMode ? 'Edit' : coords && deleteMode ? 'Delete' : 'Add'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateOrEditOrDeleteModal