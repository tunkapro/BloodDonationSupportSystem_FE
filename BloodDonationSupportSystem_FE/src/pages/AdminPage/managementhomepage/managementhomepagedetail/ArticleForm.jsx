import {
  Button,
  TextField,
  Box,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function ArticleForm({
  onSubmit,
  initialValues = { title: "", content: "", articleType: "" },
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const articleTypes = ["Tin tức", "Thông báo", "Hướng dẫn", "Blog"];
  const [selectedType, setSelectedType] = useState(
    initialValues.articleType || ""
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedType(value);
    setValue("articleType", value); // Gán giá trị vào form
  };

  const handleFormSubmit = (data) => {
    data.articleType = selectedType; // Thêm articleType vào dữ liệu
    onSubmit(data);
  };

  useEffect(() => {
    reset(initialValues);
    setSelectedType(initialValues.articleType || "");
  }, [initialValues, reset]);

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Tiêu đề"
        {...register("title", { required: "Tiêu đề không được để trống" })}
        error={!!errors.title}
        helperText={errors.title?.message}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Nội dung"
        multiline
        rows={4}
        {...register("content", { required: "Nội dung không được để trống" })}
        error={!!errors.content}
        helperText={errors.content?.message}
        margin="normal"
      />
      <FormControl margin="normal" fullWidth required {...register("articleType", { required: "Yêu cầu chọn thể lo"})}>
        <InputLabel id="select-label">Thể loại</InputLabel>
        <Select
          labelId="select-label"
          value={articleTypes}
          label="Thể loại"
          onChange={handleChange}
        >
          {articleTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          
      <Button  type="submit" variant="contained">
        {initialValues?.id ? "Cập nhật" : "Thêm bài viết"}
      </Button>
    </Box>
  );
}
