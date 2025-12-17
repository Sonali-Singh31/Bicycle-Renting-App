import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { getApprovedRentRequests } from "../../api";
import NoContent from "../common/NoContent";

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(Number(timestamp)).toLocaleString();
};

const ApprovedRequests = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  const fetchApprovedRequests = async () => {
    try {
      const res = await getApprovedRentRequests();
      console.log("Approved API response:", res.data);
      setApprovedRequests(res.data || []);
    } catch (err) {
      console.error("Approved fetch error:", err);
      setApprovedRequests([]);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-3">
        <h4 className="text-center mb-3">Approved Rent Requests</h4>

        {approvedRequests.length === 0 ? (
          <NoContent message="No approved rent requests found" />
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
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
              {approvedRequests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
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
      </Card>
    </Container>
  );
};

export default ApprovedRequests;
