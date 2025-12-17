import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { getApprovedReturnRequests } from "../../api";
import NoContent from "../common/NoContent";

const formatDate = (ts) =>
  ts ? new Date(Number(ts)).toLocaleString() : "N/A";

const ApprovedReturns = () => {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    fetchApprovedReturns();
  }, []);

  const fetchApprovedReturns = async () => {
    const res = await getApprovedReturnRequests();
    console.log("APPROVED RETURNS:", res.data);
    setReturns(res.data || []);
  };

  return (
    <Container className="mt-4">
      <Card className="text-center p-3 mb-4">
        <div className="main-heading">Approved Return Requests</div>
      </Card>

      {returns.length === 0 ? (
        <NoContent
          heading="No approved return requests."
          text="Please check back later."
        />
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Return ID</th>
              <th>User</th>
              <th>Username</th>
              <th>Bicycle</th>
              <th>Cost / Hour</th>
              <th>Approved By</th>
              <th>Approved Time</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r._id}</td>
                <td>
                  {r.rentalId?.userId?.firstName}{" "}
                  {r.rentalId?.userId?.lastName}
                </td>
                <td>{r.rentalId?.userId?.username}</td>
                <td>{r.rentalId?.bicycleId?.bicycleName}</td>
                <td>{r.rentalId?.bicycleId?.costPerHour}</td>
                <td>
                  {r.approvedByAdminId?.firstName}{" "}
                  {r.approvedByAdminId?.lastName}
                </td>
                <td>{formatDate(r.requestApprovedTime)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ApprovedReturns;
