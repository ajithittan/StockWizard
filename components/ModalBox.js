import {useState} from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: "white",
  p: 1,
};

const ModalBox = (props) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {setOpen(false);props.onClose()}

  return (
    <div style={{margin:"300px"}}>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography sx={{m:4}}>
            {props.content}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default ModalBox