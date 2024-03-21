import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { useState } from "react";
import { Box, Fade, Modal, Typography } from "@mui/material";

const userDataString = localStorage.getItem("userData");
const userData = userDataString ? JSON.parse(userDataString) : [];

interface UserData {
  id: any;

  dates: any;
  description: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface User {
  dates: {
    orderDate: string;
    deliveryMinDate: string;
  };
}
export default function DataTable() {
  const [selectedUser, setSelectedUser] = useState<User | any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [dateRange, setDateRange] = useState<string[]>([]);

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setOpenModal(true);
    setDateRange(loopDate(user.dates.orderDate, user.dates.deliveryMinDate));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDateRange([]);
  };

  const loopDate = (startDate: string, endDate: string) => {
    const datesArray = [];
    let currentDate = moment(startDate);
    const end = moment(endDate);

    while (currentDate.isSameOrBefore(end)) {
      datesArray.push(currentDate.format("DD/MM/YYYY"));
      currentDate.add(1, "days");
    }

    return datesArray;
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Size</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Dates</TableCell>
              <TableCell align="center">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user: any) => (
              <TableRow
                key={user.id}
                // onClick={() => handleRowClick(user)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.size}</TableCell>
                <TableCell align="center">{user.category}</TableCell>
                <TableCell align="center">{user.price}</TableCell>
                <TableCell align="center" onClick={() => handleRowClick(user)}>
                  {moment(user.dates.orderDate).format("DD/MM/YYYY")} /{" "}
                  {moment(user.dates.deliveryMinDate).format("DD/MM/YYYY")}
                </TableCell>

                <TableCell align="center">
                  <div className="timg">
                    <img
                      src={user.image}
                      alt="User"
                      width={30}
                      className="tableImg"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedUser && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Dates
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {dateRange.map((date) => (
                  <div key={date}>{date}</div>
                ))}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
