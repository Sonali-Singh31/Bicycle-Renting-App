
import React, { useEffect, useState } from "react";
import { Card, Container, Table, Button } from "react-bootstrap";
import {
  getPendingRentRequestsAdmin,
  approveRentRequest,
  rejectRentRequest,
} from "../../api/index";
import NoContent from "../common/NoContent";

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await getPendingRentRequestsAdmin();
      console.log("Admin API response:", response);
      setPendingRequests(response.data || []);
    } catch (error) {
      console.error(
        "Error fetching pending requests:",
        error.response?.data || error.message
      );
      setPendingRequests([]);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await approveRentRequest(requestId);
      setPendingRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (error) {
      console.error("Error approving request:", error.response?.data || error.message);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRentRequest(requestId);
      setPendingRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (error) {
      console.error("Error rejecting request:", error.response?.data || error.message);
    }
  };

  const formatDate = (timestamp) =>
    timestamp ? new Date(timestamp).toLocaleString() : "N/A";

  return (
    <Container>
      <Card
        className="text-center p-3 mb-4"
        style={{
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          border: "none",
        }}
      >
        <div className="main-heading">Pending Rent Requests</div>
      </Card>

      {pendingRequests.length === 0 ? (
        <NoContent
          heading="No pending rent requests at the moment."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>User Name</th>
              <th>Username</th>
              <th>Bicycle Name</th>
              <th>Cost Per Hour</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr key={request._id}>
                <td>{request._id}</td>
                <td>
                  {request.userId?.firstName || "N/A"}{" "}
                  {request.userId?.lastName || ""}
                </td>
                <td>{request.userId?.username || "N/A"}</td>
                <td>{request.bicycleId?.bicycleName || "N/A"}</td>
                <td>{request.bicycleId?.costPerHour ?? "N/A"}</td>
                <td>{formatDate(request.requestDate)}</td>
                <td>
                  <Button
                    variant="success"
                    className="me-2"
                    onClick={() => handleApprove(request._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleReject(request._id)}
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default PendingRequests;
