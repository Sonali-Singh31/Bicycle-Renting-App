import React, { useEffect, useState } from "react";
import {
  getPendingReturnRequestsAdmin,
  approveReturnRequest,
} from "../../api";
import { Card, Button, Container, Table } from "react-bootstrap";
import NoContent from "../common/NoContent";

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(Number(timestamp)).toLocaleString();
};

const PendingReturns = () => {
  const [pendingReturns, setPendingReturns] = useState([]);

  useEffect(() => {
    fetchPendingReturns();
  }, []);

  const fetchPendingReturns = async () => {
    try {
      const res = await getPendingReturnRequestsAdmin();
      console.log("ADMIN PENDING RETURNS:", res.data);

      // safety: remove broken populated docs
      const valid = (res.data || []).filter(r => r.rentalId);
      setPendingReturns(valid);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (returnId) => {
    await approveReturnRequest(returnId);
    setPendingReturns(prev =>
      prev.filter(r => r._id !== returnId)
    );
  };

  return (
    <Container>
      <Card className="text-center p-3 mb-4">
        <div className="main-heading">Pending Return Requests</div>
      </Card>

      {pendingReturns.length === 0 ? (
        <NoContent
          heading="No pending returns."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Return ID</th>
              <th>Rental ID</th>
              <th>User</th>
              <th>Bicycle</th>
              <th>Cost / Hour</th>
              <th>Requested At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingReturns.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req._id}</td>
                <td>{req.rentalId._id}</td>
                <td>
                  {req.rentalId.userId?.firstName}{" "}
                  {req.rentalId.userId?.lastName}
                </td>
                <td>{req.rentalId.bicycleId?.bicycleName}</td>
                <td>{req.rentalId.bicycleId?.costPerHour}</td>
                <td>{formatDate(req.requestCreatedTime)}</td>
                <td>
                  <Button
                    variant="outline-success"
                    onClick={() => handleApprove(req._id)}
                  >
                    Approve
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

export default PendingReturns;
