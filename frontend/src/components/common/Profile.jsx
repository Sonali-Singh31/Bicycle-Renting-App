import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./ProfilePage.css";
import { getUserProfile } from "../../api/index";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const res = await getUserProfile(); 
      console.log("User details:", res);
      setUserDetails(res.data); // ✅ pick the `data` object from response
    } catch (error) {
      console.log("Error fetching user details: ", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!userDetails) {
    return <p>Loading profile...</p>;
  }

  return (
    <Container className="profile-container">
      <Row>
        <Col xs={4} className="profile-image-col">
          <Image
            src={require("../../images/user.png")}
            roundedCircle
            fluid
            className="profile-image"
          />
        </Col>
        <Col xs={8} className="profile-info-col">
          <h2>Profile Information</h2>
          <p><strong>First Name:</strong> {userDetails.firstName}</p>
          <p><strong>Last Name:</strong> {userDetails.lastName}</p>
          <p><strong>Username:</strong> {userDetails.username}</p>
          <p><strong>Role:</strong> {userDetails.usertype}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
  