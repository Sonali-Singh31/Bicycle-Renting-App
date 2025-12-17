import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { getApprovedRentRequests } from "../../api";
import NoContent from "../common/NoContent";

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(Number(timestamp)).toLocaleString();
};

const AdminRequests = () => {
  const [adminRequests, setAdminRequests] = useState([]);

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  const fetchApprovedRequests = async () => {
    try {
      const res = await getApprovedRentRequests();
      console.log("APPROVED ONLY:", res.data);
      setAdminRequests(res.data || []);
    } catch (error) {
      console.error("Error fetching approved requests:", error);
      setAdminRequests([]);
    }
  };

  return (
    <Container className="mt-4">
      <Card
        className="text-center p-3 mb-4"
        style={{
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "10px",
          border: "none",
        }}
      >
        <div className="main-heading">Approved Rent Requests</div>
      </Card>

      {adminRequests.length === 0 ? (
        <NoContent
          heading="No approved rent requests available."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Request ID</th>
              <th>User</th>
              <th>Username</th>
              <th>Bicycle</th>
              <th>Cost / Hour</th>
              <th>Request Date</th>
              <th>Approved By</th>
              <th>Approved Time</th>
            </tr>
          </thead>
          <tbody>
            {adminRequests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req._id}</td>
                <td>
                  {req.userId?.firstName} {req.userId?.lastName}
                </td>
                <td>{req.userId?.username}</td>
                <td>{req.bicycleId?.bicycleName}</td>
                <td>{req.bicycleId?.costPerHour}</td>
                <td>{formatDate(req.requestDate)}</td>
                <td>
                  {req.approvedByAdminId
                    ? `${req.approvedByAdminId.firstName} ${req.approvedByAdminId.lastName}`
                    : "N/A"}
                </td>
                <td>{formatDate(req.requestApprovedTime)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminRequests;
