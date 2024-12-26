import { Task } from "@/app/lib/interfaces";
import { Box, Modal, Typography } from "@mui/material";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  Title?: string;
  FormComponent: React.ElementType;
  taskData?: Task;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "90%",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
};

const TaskModal = ({
  open,
  setOpen,
  Title,
  FormComponent,
  taskData,
}: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <b>{Title && Title}</b>
        </Typography>

        <FormComponent setOpen={setOpen} taskData={taskData} />
      </Box>
    </Modal>
  );
};

export default TaskModal;
