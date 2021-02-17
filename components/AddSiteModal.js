import { useRef } from 'react'
import { createSite } from '@/lib/db';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form";


const AddSiteModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef()
    const finalRef = useRef()

    const { register, handleSubmit } = useForm();
    const onCreateSite = data => createSite(data);

    return (
        <>
            <Button onClick={onOpen} fontWeight="medium" maxW="200px" variant="solid" size="md"> Add Your First Site. </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
                    <ModalHeader fontWeight="bold">Add Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>name</FormLabel>
                            <Input ref={initialRef} placeholder="My site" name="site" ref={register({ required: true })} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Link</FormLabel>
                            <Input placeholder="https://website.com" name="url" ref={register({ required: true })} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">Cancel</Button>
                        <Button color="#194D4C" backgroundColor="#99FFFE" type="submit">Create</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddSiteModal