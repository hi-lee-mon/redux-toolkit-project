import { Box } from "@mui/system";
import React from "react";
import { TaskItem } from "../taskItem/TaskItem";
import sampleData from "./sample.json";

export const TaskList: React.FC = () => {
  return (
    <Box sx={{ height: "50vh", overflow: "hidden", overflowY: "auto" }}>
      {sampleData.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </Box>
  );
};
