import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';

const AgentPanelExposes = () => {
    return (
        <>
            <Sidebar />
            <Container className="search-download-container mt-5">
                <h3 className="text-center mb-4">Search and Download Exposes</h3>
                <Form id="searchForm">
                    <Form.Group className="mb-3" controlId="searchQuery">
                        <Form.Label>Search Expose</Form.Label>
                        <Form.Control type="text" placeholder="Enter expose name or keyword" required />
                    </Form.Group>
                    <Button style={{ backgroundColor: '#33db4a', width: "100px" }} type="submit" >

                        Search
                    </Button>
                </Form>
                <h4 className="mt-4">Search Results</h4>
                <div id="searchResults" className="mt-3"></div>
            </Container>
        </>
    );
}

export default AgentPanelExposes;
