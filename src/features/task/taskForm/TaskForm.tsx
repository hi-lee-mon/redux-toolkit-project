import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// Redux
import { createTask } from "../taskSlice";
import { useDispatch } from "react-redux";

// style
const root = { width: "30vw", mb: "20px" };
const textField = { width: "100%" };

// submit value type
type Input = {
  taskTitle: string;
};

// yupスキーマ定義
const schema = yup.object().shape({
  taskTitle: yup.string().required("タスク入力は必須です。"),
});

/**
 *
 * コンポーネント
 */
export const TaskForm: React.FC = () => {
  // dispatch
  const dispatch = useDispatch();

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

  // jsx
  return (
    <Box sx={root}>
      <form onSubmit={handleSubmit(handleCreate)}>
        <Controller
          name="taskTitle"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={textField}
              label="NewTask"
              variant="outlined"
              error={!!errors.taskTitle}
              helperText={errors.taskTitle ? errors.taskTitle?.message : ""}
            />
          )}
        />
      </form>
    </Box>
  );
};
