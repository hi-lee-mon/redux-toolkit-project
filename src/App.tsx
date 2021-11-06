import { Box } from "@mui/system";
import Header from "./components/Header";
import { TaskForm } from "./features/task/taskForm/TaskForm";
import { TaskList } from "./features/task/taskList/TaskList";

const root = {
  display: "flex",
  bgcolor: "#ffd5c9",
  height: "100vh",
  width: "100vw",
  justifyContent: "center",
  alignItems: "center",
};
const wrapper = {
  height: "70vh",
  width: "70vw",
  borderRadius: "10px",
  bgcolor: "#f1f2f7",
  padding: "10px 40px",
};

const App: React.FC = () => {
  return (
    <Box sx={root}>
      <Box sx={wrapper}>
        <Header />
        <TaskForm />
        <TaskList />
      </Box>
    </Box>
  );
};

export default App;
