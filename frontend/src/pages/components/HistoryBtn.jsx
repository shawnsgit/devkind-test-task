import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import HistoryTable from "./HistoryTable";

export default function HistoryBtn({ setAlert }) {
  const [open, setOpen] = React.useState(false);
  const [history, setHistory] = React.useState([]);

  const handleClickOpen = (event) => {
    event.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user._id) {
      try {
        axios
          .get(`http://localhost:5000/history?id=${user._id}`)
          .then((res) => {
            const data = res.data;
            if (data.result ?? false === true) {
              setHistory(data.profileHistory);
            } else {
              setAlert({ show: true, type: "error", msg: data.errors.msg });
            }
          });
      } catch (err) {
        setAlert({ show: true, type: "error", msg: err });
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>History</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Profile History</DialogTitle>
        <DialogContent dividers>
          <HistoryTable history={history} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
