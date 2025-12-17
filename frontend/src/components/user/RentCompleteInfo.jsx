import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { getCompletedRentsInfo } from "../../api";
import NoContent from "../common/NoContent";

const formatDate = (ts) =>
  ts ? new Date(Number(ts)).toLocaleString() : "N/A";

const RentCompleteInfo = () => {
  const [completedRentals, setCompletedRentals] = useState([]);

  useEffect(() => {
    fetchCompletedRentals();
  }, []);

  const fetchCompletedRentals = async () => {
    const res = await getCompletedRentsInfo();
    console.log("COMPLETED RENTALS:", res.data);

    // safety filter
    const valid = (res.data || []).filter(r => r.bicycleId);
    setCompletedRentals(valid);
  };

  return (
    <Container>
      <Card className="text-center p-3 mb-4">
        <div className="main-heading">Completed Rent Info</div>
      </Card>

      {completedRentals.length === 0 ? (
        <NoContent
          heading="No completed rentals."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Rental ID</th>
              <th>Bicycle</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Cost / Hour</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {completedRentals.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r._id}</td>
                <td>{r.bicycleId?.bicycleName}</td>
                <td>{formatDate(r.rentalStartDate)}</td>
                <td>{formatDate(r.rentalEndDate)}</td>
                <td>{r.bicycleId?.costPerHour}</td>
                <td>{r.rentalCost}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default RentCompleteInfo;
