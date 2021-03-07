import { useRef } from 'react'
import { useAuth } from '@/lib/auth';
import { useForm } from "react-hook-form";
import { updateSite } from '@/lib/db';
import { mutate } from 'swr'

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
    Switch,
    useToast,
    Flex,
} from "@chakra-ui/react"
import { SettingsIcon } from '@chakra-ui/icons'


const EditSiteModal = ({ settings, siteId, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef()
    const toast = useToast()
    const auth = useAuth()

    const { register, handleSubmit } = useForm();
    const onUpdateSite = async (newSettings) => {
        await updateSite(siteId, {
            settings: newSettings
        });
        toast({
            title: 'Success!',
            description: "We've updated your site.",
            status: 'success',
            duration: 5000,
            isClosable: true
        });

        mutate(`/api/site/${siteId}`);
        onClose();
    };

    return (
        <>
            <Button
                onClick={onOpen}
                leftIcon={<SettingsIcon />}
                color="white"
                bgColor="black"
                variant="solid">{children}</Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose} >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onUpdateSite)}>
                    <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl as="flex" direction="row">
                            <Flex>
                                <Switch
                                    key={settings?.timestamp}
                                    name="timestamp"
                                    ref={register()}
                                    color="green"
                                    defaultIsChecked={settings?.timestamp} />
                                <FormLabel ml={2} htmlFor="show-timestamp" >
                                    Show Timestamp
                            </FormLabel>
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <Flex>
                                <Switch
                                    key={settings?.icons}
                                    name="icons"
                                    ref={register()}
                                    color="green"
                                    defaultIsChecked={settings?.icons}
                                />
                                <FormLabel ml={2} htmlFor="show-icons">
                                    Show Icon
                                </FormLabel>
                            </Flex>
                        </FormControl>
                        <FormControl>
                            <Flex>
                                <Switch
                                    key={settings?.ratings}
                                    name="ratings"
                                    ref={register()}
                                    color="green"
                                    defaultIsChecked={settings?.ratings}
                                />
                                <FormLabel ml={2} htmlFor="show-ratings">
                                    Show Ratings
                        </FormLabel>
                            </Flex>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">
                            Cancel
                        </Button>
                        <Button
                            backgroundColor="#99FFFE"
                            color="#194D4C"
                            fontWeight="medium"
                            type="submit" >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditSiteModal