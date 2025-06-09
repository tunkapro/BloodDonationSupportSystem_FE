
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function BloodDonationSurveyForm() {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, mb: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Phiếu đăng ký hiến máu
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Câu hỏi 1 */}
        <QuestionBlock label="1. Anh/chị từng hiến máu chưa?">
          <Controller
            name="da_tung_hien_mau"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={field.value?.includes("Có") || false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      field.onChange(
                        checked
                          ? ["Có"]
                          : []
                      );
                    }}
                  />}
                  label="Có"
                />
                <FormControlLabel
                  control={<Checkbox checked={field.value?.includes("Không") || false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      field.onChange(
                        checked
                          ? ["Không"]
                          : []
                      );
                    }}
                  />}
                  label="Không"
                />
              </FormGroup>
            )}
          />
        </QuestionBlock>

        {/* Câu hỏi 2 */}
        <QuestionBlock label="2. Hiện tại, anh/chị có mắc bệnh lý nào không?">
          <Controller
            name="mac_benh"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel control={<Checkbox {...field} value="Có" />} label="Có" />
                <FormControlLabel control={<Checkbox {...field} value="Không" />} label="Không" />
              </FormGroup>
            )}
          />
        </QuestionBlock>

        {/* Câu hỏi 3 */}
        <QuestionBlock label="3. Trước đây, anh/chị có từng mắc một trong các bệnh: viêm gan siêu vi B, C, HIV, vẩy nến, bệnh di truyền, bệnh máu, bệnh tim, động kinh,...?">
          <Controller
            name="tien_su_benh"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel control={<Checkbox {...field} value="Có" />} label="Có" />
                <FormControlLabel control={<Checkbox {...field} value="Không" />} label="Không" />
                <TextField
                  label="Bệnh khác"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                />
              </FormGroup>
            )}
          />
        </QuestionBlock>

        {/* Câu hỏi 4 */}
        <QuestionBlock label="4. Trong 12 tháng gần đây, anh/chị có:">
          <Controller
            name="trong_12_thang"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <TextField
                  label="Khỏi bệnh sau khi mắc sốt rét, giang mai, lao, viêm não..."
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Được truyền máu hoặc chế phẩm máu?"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Tiêm vaccine?"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                <FormControlLabel control={<Checkbox {...field} value="Không có" />} label="Không có" />
              </FormGroup>
            )}
          />
        </QuestionBlock>

        {/* Câu hỏi 5 */}
        <QuestionBlock label="5. Trong thời gian gần đây, anh/chị có:">
          <Controller
            name="gan_day"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <TextField
                  label="Khỏi bệnh sau khi mắc bệnh mãn tính?"
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="Có triệu chứng sốt, đau họng, viêm mũi?"
                  fullWidth
                  variant="outlined"
                  size="small"
                />
              </FormGroup>
            )}
          />
        </QuestionBlock>

        {/* Buttons */}
        <Grid container spacing={2} mt={3}>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth>
              Quay về
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Tiếp tục
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

// Component Question Block
const QuestionBlock = ({ label, children }) => (
  <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 2 }}>
    <FormControl component="fieldset" fullWidth>
      <FormLabel component="legend" sx={{ mb: 1, fontWeight: "bold" }}>
        {label}
      </FormLabel>
      {children}
    </FormControl>
  </Paper>
);
