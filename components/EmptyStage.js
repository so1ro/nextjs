import React from 'react'
import {
    Heading,
    Flex,
    Text,
    Button
} from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal';

const EmptyStage = () => (
    <Flex
        width="100%"
        backgroundColor="whiteAlpha.900"
        borderRadius={8}
        p={12}
        direction="column"
        align="center"
    >
        <Heading mb={2} size="lg">You haven't added any sites.</Heading>
        <Text mb={4}>Welcome, let's get started!</Text>
        <AddSiteModal>Add Your First Site.</AddSiteModal>
    </Flex>
)

export default EmptyStage