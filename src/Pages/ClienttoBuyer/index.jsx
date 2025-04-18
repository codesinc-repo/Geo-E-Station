import React from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';

const ClienttoBuyer = () => {
    return (
        <>
            <Sidebar />
            <Container className="search-download-container mt-5">
                <h3 className="text-center mb-4">Manage Buyer Profiles</h3>
                <Form id="searchForm">
                    <Form.Group className="mb-3" controlId="searchQuery">
                        <Form.Label>Buyer Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Buyer Name" required />
                    </Form.Group>
                    <Button style={{ backgroundColor: '#33db4a', width: "100px" }} type="submit" >

                        Add Buyer
                    </Button>
                </Form>
                <h4 className="mt-4">Buyer List</h4>
                <div id="searchResults" className="mt-3"></div>
            </Container>
        </>
    );
}

export default ClienttoBuyer;
