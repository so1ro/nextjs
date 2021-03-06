import React, { useState } from 'react';
import { Switch, Box, Code } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr'

import { Td } from './Table';
import RemoveButton from './RemoveButton';
import { updateFeedback } from '@/lib/db';

const FeedbackTableRow = ({ id, author, text, status }) => {
    const auth = useAuth()
    const isChecked = status === 'active';

    const toggleFeedback = async () => {
        await updateFeedback(id, { status: isChecked ? 'pending' : 'active' })
        mutate(['/api/feedback', auth.user.token])
    }

    return (
        <Box as="tr" key={id} >
            <Td fontWeight="medium" >{author}</Td>
            <Td>{text}</Td>
            <Td><Code>{'/'}</Code></Td>
            <Td>
                <Switch
                    isChecked={isChecked}
                    colorScheme="green"
                    onChange={toggleFeedback} />
            </Td>
            <Td><RemoveButton feedbackId={id} /> </Td>
        </Box>
    );
};

export default FeedbackTableRow;
