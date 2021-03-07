import React from 'react';
import { Table, Tr, Th, Td } from './Table';
import FeedbackTableRow from './FeedbackTableRow';

const FeedbackTable = ({ allFeedback }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Feedback</Th>
                    <Th>Route</Th>
                    <Th>Visible</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {allFeedback.map(feedback => <FeedbackTableRow key={feedback.id} {...feedback} />)}
            </tbody>
        </Table>
    );
};

export default FeedbackTable;
