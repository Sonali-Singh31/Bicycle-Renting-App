import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { getPendingReturnRequests } from "../../api";
import NoContent from "../common/NoContent";

function PendingReturns() {
  const [returnRequests, setReturnRequests] = useState([]);

  useEffect(() => {
    fetchPendingReturnRequests();
  }, []);

  const fetchPendingReturnRequests = async () => {
    try {
      const res = await getPendingReturnRequests();
      console.log("PENDING RETURNS:", res.data);

      // 🔥 filter out null rentals (important)
      const valid = (res.data || []).filter(r => r.rentalId);
      setReturnRequests(valid);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Card className="text-center p-3 mb-4">
        <div className="main-heading">Pending Returns</div>
      </Card>

      {returnRequests.length === 0 ? (
        <NoContent
          heading="No pending return requests."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Return ID</th>
              <th>Rental ID</th>
              <th>Bicycle Name</th>
              <th>Cost / Hour</th>
            </tr>
          </thead>
          <tbody>
            {returnRequests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req._id}</td>
                <td>{req.rentalId._id}</td>
                <td>{req.rentalId.bicycleId?.bicycleName}</td>
                <td>{req.rentalId.bicycleId?.costPerHour}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default PendingReturns;
