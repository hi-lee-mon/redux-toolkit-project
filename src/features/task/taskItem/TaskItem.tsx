import { Checkbox, IconButton } from "@mui/material";
import React from "react";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

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

interface Props {
  task: {
    id: number;
    title: string;
    completed: boolean;
  };
}

export const TaskItem: React.FC<Props> = ({ task }) => {
  return (
    <Box sx={root}>
      <Box sx={title}>
        <EventNoteIcon />
        <Box sx={{ ml: "10px" }}>{task.title}</Box>
      </Box>
      <Box>
        <Checkbox
          checked={task.completed}
          onChange={() => console.log(`checked ${task.id}`)}
        />
        <IconButton onClick={() => console.log(`edit ${task.id}`)}>
          <ModeEditIcon />
        </IconButton>
        <IconButton onClick={() => console.log(`delete ${task.id}`)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
