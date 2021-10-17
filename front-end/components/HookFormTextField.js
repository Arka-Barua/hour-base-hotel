import { TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

const HookFormTextField = ({ label, name, type, ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message ?? ""}
      margin="dense"
      {...rest}
      {...register(name)}
    />
  );
};

export default HookFormTextField;
