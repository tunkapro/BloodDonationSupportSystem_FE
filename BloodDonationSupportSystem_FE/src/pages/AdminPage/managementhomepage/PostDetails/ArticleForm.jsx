import {
  Button,
  TextField,
  Box,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function ArticleForm({
  onSubmit,
  initialValues = { title: "", content: "", articleType: "", status: "" },
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const articleTypes = ["TIN TỨC", "HỎI ĐÁP", "LỜI KHUYÊN", "BLOG"];

  const statusOptions = ["CHỜ DUYỆT", "ĐÃ DUYỆT", "BỊ TỪ CHỐI"];

  const [selectedType, setSelectedType] = useState(
    initialValues.articleType
  );

  const [selectedStatus, setSelectedStatus] = useState(
    initialValues.status
  );

  const [selectedImage, setSelectedImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(
    initialValues
  );

    // Convert File → base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Khi chọn ảnh
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      const base64 = await toBase64(file);       // Chuyển ảnh sang base64
      setImagePreview(base64);                   // Dùng để hiển thị + gửi đi
    }
  };
  const onSubmitForm = (data) => {
    console.log(imagePreview);
      onSubmit(data, imagePreview, selectedImage.name);

  };

  // useEffect(() => {
  //   reset(initialValues);
  //   setSelectedType(initialValues.articleType || "");
  //   setSelectedStatus(initialValues.status || "");
  //   setImagePreview(initialValues?.imageUrl || null);
  // }, [initialValues, reset]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitForm)}
      noValidate
      sx={{ mt: 2 }}
    >
      <TextField
        fullWidth
        label="Tiêu đề"
        defaultValue={title}
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
      <FormControl sx={{ minWidth: 400, maxWidth: 1000, width: "100%", mt: 2 }}
        margin="normal"
        fullWidth
        required
        error={!!errors.articleType}
      >
        <InputLabel id="select-label-article-types">Thể loại</InputLabel>
        <Select
          labelId="select-label-article-types"
          value={selectedType}
          label="Thể loại"
          onChange={(e) => {
            setSelectedType(e.target.value);
            setValue("articleType", e.target.value); // Cập nhật react-hook-form
          }}
        >
          {articleTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 400, maxWidth: 1000, width: "100%", mt: 2 }} margin="normal" fullWidth required error={!!errors.status}>
        <InputLabel id="select-label-status">Trạng thái</InputLabel>
        <Select
          labelId="select-label-status"
          value={selectedStatus}
          label="Thể loại"
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setValue("status", e.target.value);
          }}
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" component="label" fullWidth>
          {selectedImage ? "Thay ảnh khác" : "Chọn ảnh"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={
            handleFileChange}
          />
        </Button>

        {imagePreview && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="subtitle2" gutterBottom>
              Ảnh xem trước:
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={imagePreview}
                alt="preview"
                style={{
                  width: "100%",
                  maxWidth: 400,
                  maxHeight: 300,
                  objectFit: "cover",
                  borderRadius: 8,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}
              />
            </Box>

            <Box mt={1}>
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
              >
                Xóa ảnh
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <Button sx={{ marginTop: "20px" }} type="submit" variant="contained">
        {initialValues?.id ? "Cập nhật" : "Thêm bài viết"}
      </Button>




    </Box>
  );
}
