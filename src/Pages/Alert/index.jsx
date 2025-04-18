import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, ListGroup, Badge } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import "./alert.css";
import { toast } from "react-toastify";

const AlertPage = () => {
  const [savedFilters, setSavedFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch saved filters from API
  const fetchSavedFilters = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`https://apis.geoestate.ai/api/UserFilter/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch saved filters');
      }
      const data = await response.json();
      setSavedFilters(data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching saved filters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedFilters();
  }, []);

  // Function to handle filter deletion
  const handleDeleteFilter = async (filterId) => {
    if (!window.confirm('Are you sure you want to delete this filter?')) return;
    
    try {
      setIsDeleting(true);
      const userId = localStorage.getItem('user_id');
      
      const response = await fetch(`https://apis.geoestate.ai/api/UserFilter/${filterId}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete filter');
      }
  
      toast.success('Filter deleted successfully!');
      // Refetch the filters after successful deletion
      await fetchSavedFilters();
      
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.message || 'Error deleting filter');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Sidebar />
      <Container
        fluid
        style={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
          padding: "20px",
        }}
      >
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="Newcardclass"
              style={{
                width: "77vw",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <Card.Body className="AlertIn" >
                <h1 className="mb-4" style={{ fontWeight: "bold" }}>
                  Saved Filters
                </h1>
                
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading your filters...</p>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger">
                    Error loading filters: {error}
                  </div>
                ) : savedFilters.length > 0 ? (
                  <ListGroup variant="flush">
                    {savedFilters.map((filter) => (
                      <ListGroup.Item key={filter.id} className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5>{filter.filterName}</h5>
                          <small className="text-muted">
                            Created: {new Date(filter.createdAt).toLocaleDateString()}
                          </small>
                          <div className="mt-2">
                            <Badge bg="info" className="me-2">
                              {JSON.parse(filter.filterJson).country || 'Any Country'}
                            </Badge>
                            {JSON.parse(filter.filterJson).minPrice && (
                              <Badge bg="secondary" className="me-2">
                                Min: ${JSON.parse(filter.filterJson).minPrice}
                              </Badge>
                            )}
                            {JSON.parse(filter.filterJson).maxPrice && (
                              <Badge bg="secondary" className="me-2">
                                Max: ${JSON.parse(filter.filterJson).maxPrice}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <Button 
                            variant="outline-danger" 
                            size="sm" 
                            onClick={() => handleDeleteFilter(filter.id)}
                            className="me-2"
                            disabled={isDeleting}
                          >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                          </Button>
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => {
                              // You can implement edit functionality here
                              // Or navigate to the filters page with this filter pre-loaded
                            }}
                          >
                            Use Filter
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted mb-3">You currently have no saved filters.</p>
                    <p className="text-muted" style={{ margin: "5px 0" }}>
                      Create filters in the properties page to see them here.
                    </p>
                    <Button
                      variant="success"
                      style={{ marginTop: "20px", backgroundColor: "#28a745" }}
                      className="text-white"
                      onClick={() => {
                        // Navigate to your properties/filters page
                        // window.location.href = '/properties';
                      }}
                    >
                      Create Filters
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AlertPage;