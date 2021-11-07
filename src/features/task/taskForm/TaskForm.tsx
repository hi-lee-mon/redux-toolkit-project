import { Button, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Redux
import {
  createTask,
  selectSelectedTask,
  editTask,
  handleModalOpen,
} from "../taskSlice";
import { useDispatch, useSelector } from "react-redux";

// style
const root = { width: "30vw", mb: "20px" };
const textField = { width: "100%" };

// type
type Input = {
  taskTitle: string;
};

type props = {
  edit?: boolean;
};

// yupスキーマ定義
const schema = yup.object().shape({
  taskTitle: yup.string().required("タスク入力は必須です。"),
});

/**
 *
 * コンポーネント
 */
export const TaskForm: React.FC<props> = ({ edit }) => {
  // dispatch
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectSelectedTask);

  // useForm
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // SubmitHandler
  const handleCreate: SubmitHandler<Input> = (data) => {
    dispatch(createTask(data.taskTitle));
    reset({ taskTitle: "" });
  };

  const handleEdit: SubmitHandler<Input> = (data) => {
    const sendData = { ...selectedTask, title: data.taskTitle };
    dispatch(editTask(sendData));
    dispatch(handleModalOpen(false));
  };

  // jsx
  return (
    <Box sx={root}>
      <form
        onSubmit={edit ? handleSubmit(handleEdit) : handleSubmit(handleCreate)}
      >
        <Controller
          name="taskTitle"
          defaultValue={edit ? selectedTask.title : ""}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={textField}
              label={edit ? "Edit Task" : "New Task"}
              variant="outlined"
              error={!!errors.taskTitle}
              helperText={errors.taskTitle ? errors.taskTitle?.message : ""}
            />
          )}
        />
        {edit ? (
          <Stack
            sx={{ display: "flex", flexDirection: "column", mt: "20px" }}
            spacing={1}
          >
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(handleModalOpen(false))}
            >
              Cancel
            </Button>
          </Stack>
        ) : null}
      </form>
    </Box>
  );
};
