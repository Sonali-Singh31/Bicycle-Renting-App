  import React, { useEffect, useState } from "react";
  import { Card, Container, Table } from "react-bootstrap";
  import { getPendingRentRequestsUser } from "../../api/index";
  import NoContent from "../common/NoContent";

  function PendingRequests() {
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
      fetchPendingRequests();
    }, []);

    const fetchPendingRequests = async () => {
      try {
        const response = await getPendingRentRequestsUser();
        // response is already unwrapped in API helper
        setPendingRequests(response.data || []);
        console.log("pending requests data", response.data);
      } catch (error) {
        console.log("Error fetching pending requests:", error);
        setPendingRequests([]);
      }
    };

    return (
      <Container>
        <Card
          className="text-center p-3 mb-4"
          style={{
            boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <div className="main-heading">Pending Rent Requests</div>
        </Card>

        {Array.isArray(pendingRequests) && pendingRequests.length === 0 ? (
          <NoContent
            heading="No pending rent requests at the moment."
            text="Please check back later."
          />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Bicycle Name</th>
                <th>Cost Per Hour</th>
                <th>Request Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pendingRequests) &&
                pendingRequests.map((request) => (
                  <tr key={request._id}>
                    <td>{request._id}</td>
                    <td>{request.bicycleId?.bicycleName || "N/A"}</td>
                    <td>{request.bicycleId?.costPerHour || "N/A"}</td>
                    <td>{request.requestStatus}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Container>
    );
  }

  export default PendingRequests;
