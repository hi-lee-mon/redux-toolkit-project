import { Checkbox, IconButton, Typography } from "@mui/material";
import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import { TaskForm } from "../taskForm/TaskForm";
// Redux
import {
  handleModalOpen,
  selectIsModalOpen,
  selectedTask,
  completeTask,
  deleteTask,
} from "../taskSlice";
import { useDispatch, useSelector } from "react-redux";

// style
const root = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "5px",
  bgcolor: "#ffffff",
  p: "10px 20px",
  mb: "10px",
};
const title = { display: "flex", alignItems: "center" };

const modalContainer = {
  bgcolor: "#ffffff",
  width: "40vw",
  height: "40vh",
  display: "flex",
  flexDirection: "column",
  // directionでcolumnを指定しているためalignItemsがjustifyContentになっている。
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "5px",
  // 疑似クラスは以下のように定義できる。
  ":focus": {
    outline: "none",
  },
};

// 型
interface Props {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}

export const TaskItem: React.FC<Props> = ({ task }) => {
  // Redux
  const dispatch = useDispatch(); // ⇐おまじない
  const isModalOpen = useSelector(selectIsModalOpen); // useSelectorにselect関数を渡すことでsliceの中で定義されているstateをコンポーネントに持ってくることができる。
  // モーダル
  const handleOpen = () => {
    dispatch(selectedTask(task));
    dispatch(handleModalOpen(true));
  };
  const handleClose = () => dispatch(handleModalOpen(false));

  return (
    <Box sx={root}>
      <Box sx={title}>
        <EventNoteIcon />
        {task.completed ? (
          <Typography sx={{ ml: "10px" }}>
            <s style={{ color: "gray" }}>{task.title}</s>
          </Typography>
        ) : (
          <Typography sx={{ ml: "10px" }}>{task.title}</Typography>
        )}
      </Box>
      <Box>
        <Checkbox
          checked={task.completed}
          onChange={() => dispatch(completeTask(task))}
        />
        <IconButton onClick={handleOpen}>
          <ModeEditIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(deleteTask(task))}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box sx={modalContainer}>
          <Typography sx={{ mb: "20px", fontSize: "20px" }}>
            Edit Task Title
          </Typography>
          <TaskForm edit={true} />
        </Box>
      </Modal>
    </Box>
  );
};
