import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { getRentedBicycles, returnBicycle } from "../../api";
import NoContent from "../common/NoContent";
import "./index.css";

function RentedBicycles() {
  const [rentedBicycles, setRentedBicycles] = useState([]);

  useEffect(() => {
    fetchRentedBicycles();
  }, []);

  const fetchRentedBicycles = async () => {
    try {
      const res = await getRentedBicycles();
      console.log("RENTED:", res.data);
      setRentedBicycles(res.data || []);
    } catch (error) {
      console.error("Error fetching rented bicycles", error);
    }
  };

  const handleReturnBicycle = async (rentalId) => {
    try {
      await returnBicycle(rentalId);
      fetchRentedBicycles();
    } catch (error) {
      console.error("Error returning bicycle", error);
    }
  };

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
        <div className="main-heading">Rented Bicycles</div>
      </Card>

      {rentedBicycles.length === 0 ? (
        <NoContent
          heading="No rented bicycles at the moment."
          text="Please check back later."
        />
      ) : (
        <div className="bicycle-list">
          {rentedBicycles.map((rental, index) => (
            <Card
              key={rental._id}
              className={
                index % 4 === 0 ? "mb-3 bicycle-card" : "mb-3 bicycle-card ml"
              }
              style={{
                width: "24%",
                minWidth: "200px",
                padding: "20px 0px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                border: "none",
              }}
            >
              <Card.Body>
                <Card.Title>
                  {rental.bicycleId?.bicycleName || "N/A"}
                </Card.Title>

                <Card.Text>
                  Rental ID: {rental._id}
                </Card.Text>

                <Card.Text>
                  Cost per Hour: {rental.bicycleId?.costPerHour}
                </Card.Text>

                <Button
                  variant="primary"
                  style={{ width: "120px" }}
                  onClick={() => handleReturnBicycle(rental._id)}
                >
                  Return
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default RentedBicycles;
