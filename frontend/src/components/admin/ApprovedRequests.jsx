// // ApprovedRequests.jsx
// import React, { useEffect, useState } from "react";
// import { Card, Container, Table } from "react-bootstrap";
// import { getApprovedReturnRequests } from "../../api/index";
// import NoContent from "../common/NoContent";
// const ApprovedRequests = () => {
//   const [approvedRequests, setApprovedRequests] = useState([]);

//   useEffect(() => {
//     // Load approved return requests when the component mounts
//     fetchApprovedRequests();
//   }, []);

//   const fetchApprovedRequests = async () => {
//     try {
//       const data = await getApprovedReturnRequests();
//       setApprovedRequests(data.data);
//       console.log("finalised requests by the admin  -> ", data.data);
//     } catch (error) {
//       // Handle error
//       console.log("Error fetching approved return requests:", error.message);
//     }
//   };

//   const convertTimestampToDateTime = (timestamp) => {
//     // Create a new Date object from the timestamp (in milliseconds)
//     const date = new Date(timestamp);

//     // Get the year, month, day, hours, minutes, and seconds from the date object
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1 and pad with leading zero if necessary
//     const day = String(date.getDate()).padStart(2, "0"); // Pad with leading zero if necessary
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");

//     // Combine the year, month, day, hours, minutes, and seconds to form the date-time string in the format "YYYY-MM-DD HH:MM:SS"
//     const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//     return dateTimeString;
//   };

//   return (
//     <Container>
//       <Card
//         className="text-center p-3 mb-4"
//         style={{
//           boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.10)",
//           borderRadius: "10px",
//           border: "none",
//         }}
//       >
//         <div className="main-heading">Approved Return Requests</div>
//       </Card>
//       {!approvedRequests || approvedRequests.length === 0 ? (
//         <NoContent
//           heading="No approved return requests at the moment."
//           text="Please check back later."
//         />
//       ) : (
//         <Table striped bordered hover>
//           <thead>
//             {/* <tr>
//               <th colSpan="11">
//                 <h4>Approved Return Requests</h4>
//               </th>
//             </tr> */}
//             <tr>
//               <th>Return ID</th>
//               <th>Rental ID</th>
//               <th>Request User ID</th>
//               <th>Request User Name</th>
//               <th>Bicycle ID</th>
//               <th>Bicycle Name</th>
//               <th>Return Request Creation Time</th>
//               <th>Return Request Granted By ID</th>
//               <th>Return Request Granted By Name</th>
//               <th>Return Request Approved Time</th>
//               <th>Cost/Hour</th>
//               <th>Total Cost</th>
//             </tr>
//           </thead>
//           <tbody>
//             {approvedRequests.map((request) => (
//               <tr key={request.return_id}>
//                 <td>{request.return_id}</td>
//                 <td>{request.rental_id}</td>
//                 <td>{request.user_id}</td>
//                 <td>{`${request.request_user_firstName} ${request.request_user_lastName}`}</td>
//                 <td>{request.bicycle_id}</td>
//                 <td>{request.bicycle_name}</td>
//                 <td>
//                   {convertTimestampToDateTime(request.request_created_time)}
//                 </td>
//                 <td>{request.approved_by_admin_id}</td>
//                 <td>{`${request.granted_by_firstName} ${request.granted_by_lastName}`}</td>
//                 <td>
//                   {convertTimestampToDateTime(request.request_approved_time)}
//                 </td>
//                 <td>{request.cost_per_hour}</td>
//                 <td>{request.rental_cost}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// };

// export default ApprovedRequests;


// ApprovedRequests.jsx
// import React, { useEffect, useState } from "react";
// import { Card, Container, Table } from "react-bootstrap";
// import { getApprovedReturnRequests } from "../../api/index";
// import NoContent from "../common/NoContent";

// const ApprovedRequests = () => {
//   const [approvedRequests, setApprovedRequests] = useState([]);

//   useEffect(() => {
//     fetchApprovedRequests();
//   }, []);

//   const fetchApprovedRequests = async () => {
//     try {
//       const response = await getApprovedReturnRequests();
//       console.log("Approved return requests -> ", response);
//       setApprovedRequests(response.data || []);
//     } catch (error) {
//       console.error(
//         "Error fetching approved return requests:",
//         error.response?.data || error.message
//       );
//       setApprovedRequests([]);
//     }
//   };

//   const formatDate = (timestamp) =>
//     timestamp ? new Date(timestamp).toLocaleString() : "N/A";

//   return (
//     <Container>
//       <Card
//         className="text-center p-3 mb-4"
//         style={{
//           boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
//           borderRadius: "10px",
//           border: "none",
//         }}
//       >
//         <div className="main-heading">Approved Return Requests</div>
//       </Card>

//       {approvedRequests.length === 0 ? (
//         <NoContent
//           heading="No approved return requests at the moment."
//           text="Please check back later."
//         />
//       ) : (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>Return ID</th>
//               <th>Rental ID</th>
//               <th>User Name</th>
//               <th>Username</th>
//               <th>Bicycle Name</th>
//               <th>Cost/Hour</th>
//               <th>Total Cost</th>
//               <th>Request Date</th>
//               <th>Approved By</th>
//               <th>Approved Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {approvedRequests.map((request) => (
//               <tr key={request._id}>
//                 <td>{request._id}</td>
//                 <td>{request.rentalId?._id || "N/A"}</td>
//                 <td>
//                   {request.userId?.firstName || "N/A"}{" "}
//                   {request.userId?.lastName || ""}
//                 </td>
//                 <td>{request.userId?.username || "N/A"}</td>
//                 <td>{request.bicycleId?.bicycleName || "N/A"}</td>
//                 <td>{request.bicycleId?.costPerHour ?? "N/A"}</td>
//                 <td>{request.rentalCost ?? "N/A"}</td>
//                 <td>{formatDate(request.requestDate)}</td>
//                 <td>
//                   {request.approvedByAdminId?.firstName || "N/A"}{" "}
//                   {request.approvedByAdminId?.lastName || ""}
//                 </td>
//                 <td>{formatDate(request.requestApprovedTime)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       )}
//     </Container>
//   );
// };

// export default ApprovedRequests;


import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import { getApprovedRentRequests } from "../../api/index"; // ✅ FIXED
import NoContent from "../common/NoContent";

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(timestamp).toLocaleString();
};

const ApprovedRequests = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  const fetchApprovedRequests = async () => {
    try {
      const response = await getApprovedRentRequests(); // ✅ FIXED
      if (response.data) {
        setApprovedRequests(response.data);
      } else {
        setApprovedRequests([]);
      }
    } catch (error) {
      console.error("Error fetching approved requests:", error);
      setApprovedRequests([]);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="p-3">
        <h4 className="mb-3">Approved Rent Requests</h4>
        {approvedRequests.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Username</th>
                <th>Bicycle</th>
                <th>Cost per Hour</th>
                <th>Request Date</th>
                <th>Approved By</th>
                <th>Approved Time</th>
              </tr>
            </thead>
            <tbody>
              {approvedRequests.map((request, index) => (
                <tr key={request._id}> {/* ✅ unique key */}
                  <td>{index + 1}</td>
                  <td>
                    {request.userId?.firstName} {request.userId?.lastName}
                  </td>
                  <td>{request.userId?.username}</td>
                  <td>{request.bicycleId?.bicycleName}</td>
                  <td>{request.bicycleId?.costPerHour}</td>
                  <td>{formatDate(request.requestDate)}</td>
                  <td>
                    {request.approvedByAdminId
                      ? `${request.approvedByAdminId.firstName} ${request.approvedByAdminId.lastName}`
                      : "N/A"}
                  </td>
                  <td>{formatDate(request.requestApprovedTime)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <NoContent message="No approved rent requests found" />
        )}
      </Card>
    </Container>
  );
};

export default ApprovedRequests;
