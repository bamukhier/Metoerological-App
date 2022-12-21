import { useState, useEffect } from 'react';
import { useDisclosure, useToast, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Box, Input } from '@chakra-ui/react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const CreateOrEditModal = ({coords, addCoords, deleteMode, updateCoords, deleteCoords}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()

    const validateCoords = (lat, long) => {
        if (!lat || !long) {
            toast({
                status: 'error',
                title: 'Enter both latitude and longitude',
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

        return {lat: numLat.toFixed(6), long: numLong.toFixed(6)}

    }

    const handleEdit = async (id, latitude, longitude) => {
        const validatedCoords = validateCoords(latitude, longitude)
        if (!validatedCoords){
            return
        } else {
            await updateCoords(id, validatedCoords)
            toast({
                status: 'success',
                title: 'Coordinates Updated Successfully',
                duration: '5000'
            })
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

    const handleAdd = async (latitude, longitude) => {
        const validatedCoords = validateCoords(latitude, longitude)
        if (!validatedCoords){
            return
        } else {
            await addCoords(validatedCoords)
            toast({
                status: 'success',
                title: 'New Coordinates Added Successfully',
                duration: '5000'
            })
            onClose()
        }
    }

    useEffect(() => {
        if (coords){
            setLatitude(coords.lat)
            setLongitude(coords.long)
        }

    }, [coords])

  return (
    <>
        {coords && !deleteMode
        ? <IconButton mx='8' icon={<FaEdit />} isRound='true' onClick={onOpen}/>
        : coords && deleteMode ? <IconButton icon={<FaTrash />} isRound='true' onClick={onOpen}/>
                      : <Button leftIcon={<FaPlus />} type='submit' colorScheme='green' px='4' onClick={onOpen}>Add Coordinates</Button>
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
                    latitude: <Input variant='filled' mt='1' mb='3' placeholder='in format (-)xx.xxxxxx' value={latitude} onChange={(e) => setLatitude(e.target.value)}/>
                </Box>
                <Box>
                    longitude: <Input variant='filled' mt='1' mb='3' placeholder='in format (-)xx.xxxxxx' value={longitude} onChange={(e) => setLongitude(e.target.value)}/>
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
                  () => {handleEdit(coords.id, latitude, longitude)} 
                  : coords && deleteMode ? () => {handleDelete(coords.id)} 
                                : () => {handleAdd(latitude, longitude)}
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

export default CreateOrEditModal