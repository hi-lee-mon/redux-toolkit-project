import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// style
const root = { width: "30vw", mb: "20px" };
const textField = { width: "100%" };

// submit value type
type Input = {
  task: string;
};

// yupスキーマ定義
const schema = yup.object().shape({
  task: yup.string().required("タスク入力は必須です。"),
});

/**
 *
 * コンポーネント
 */
export const TaskForm: React.FC = () => {
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
    console.log(data);
    reset({ task: "" });
  };

  // jsx
  return (
    <Box sx={root}>
      <form onSubmit={handleSubmit(handleCreate)}>
        <Controller
          name="task"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              sx={textField}
              label="NewTask"
              variant="outlined"
              error={!!errors.task}
              helperText={errors.task ? errors.task?.message : ""}
            />
          )}
        />
      </form>
    </Box>
  );
};
