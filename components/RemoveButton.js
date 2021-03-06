import React, { useState, useRef } from 'react'
import { mutate } from 'swr'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    IconButton
} from "@chakra-ui/react"
import { DeleteIcon } from '@chakra-ui/icons'
import { deleteFeedback } from '@/lib/db'
import { useAuth } from '@/lib/auth';

const RemoveButton = ({ feedbackId }) => {
    const auth = useAuth()

    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const onDelete = () => {
        deleteFeedback(feedbackId)
        mutate(
            // Can't remove
            ['/api/feedback', auth.user.token],
            async (data) => {
                return { feedback: data.feedback.filter(feedback => feedback.id !== feedbackId) }
            },
            false)
        onClose()
    }
    const cancelRef = useRef()

    return (
        <>
            <IconButton aria-label="Delete feedback" icon={<DeleteIcon />} onClick={() => setIsOpen(true)} />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete feedback
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default RemoveButton