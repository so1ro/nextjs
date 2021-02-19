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
    useToast,
} from "@chakra-ui/react"
import { useForm } from "react-hook-form";
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr'

const AddSiteModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef()
    const toast = useToast()
    const auth = useAuth()

    const { register, handleSubmit } = useForm();
    const onCreateSite = async ({ name, url }) => {
        const newSite = {
            authorId: auth.user.uid,
            createdAt: new Date().toISOString(),
            name,
            url
        };

        // ???? What is this "id"???
        const { id } = createSite(newSite)

        toast({
            title: "Success!",
            description: "We've added your site.",
            status: "success",
            duration: 5000,
            isClosable: true,
        })

        mutate('/api/sites', async (data) => ({
            sites: [{ id, ...newSite }, ...data.sites]
        }),
            false)

        //  ??? Doesn't it need "Revalidation here???"
        //  mutate('/api/user')

        onClose()
    };

    return (
        <>
            <Button onClick={onOpen} colorScheme="teal" variant="solid">{children}</Button>
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
                            <Input placeholder="My site" name="name" ref={register({ required: true })} />
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