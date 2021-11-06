import { Box } from "@mui/system";
import React from "react";
import { TaskItem } from "../taskItem/TaskItem";
// Redux
import { useSelector } from "react-redux";
import { selectTask } from "../taskSlice";

export const TaskList: React.FC = () => {
  // stateが渡ってきた？
  const tasks = useSelector(selectTask);
  return (
    <Box sx={{ height: "50vh", overflow: "hidden", overflowY: "auto" }}>
      {tasks.map((task) => (
        <TaskItem task={task} key={task.id} />
      ))}
    </Box>
  );
};
