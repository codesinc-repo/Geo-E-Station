import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import Sidebar from "../../components/Sidebar";
import "./userexposes.css"

const UserExposes = () => {
  const [exposes, setExposes] = useState([]);

  const fetchExposes = async () => {
    const storedId = localStorage.getItem("user_id");
    try {
      const response = await axios.get(
        `https://apis.geoestate.ai/api/Exposes/GetExposesByUserId/${storedId}`
      );
      setExposes(response.data);
      console.log("Fetched Exposes: ", response.data);
    } catch (err) {
      console.error("Error Fetching exposes: ", err);
    }
  };

  useEffect(() => {
    fetchExposes();
  }, []);

  const handleDeleteExpose = (id) => {
    setExposes(exposes.filter((expose) => expose.id !== id));
    // Call an API to delete from the backend if needed
  };

  return (
    <>
      <Sidebar />container
      <Container className="newcontainer search-download- mt-5">
        <h3 className="text-center mb-4">Search and Download Exposes</h3>
        <Form id="searchForm"> {/* ✅ Properly added closing tag */}
          <Form.Group className="mb-3" controlId="searchQuery">
            <Form.Label>Search Expose</Form.Label>
            <Form.Control type="text" placeholder="Enter expose name or keyword" required />
          </Form.Group>
          <Button style={{ backgroundColor: "#33db4a", width: "100px" }} type="submit">
            Search
          </Button>
        </Form> {/* ✅ Closing the <Form> properly */}

        <Row>
          {exposes.map((expose) => (
            <div key={expose.id} className="expose-item">
              <h5>{expose.name}</h5>
              <Button variant="danger" onClick={() => handleDeleteExpose(expose.id)}>
                <IoClose /> Delete
              </Button>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UserExposes;
