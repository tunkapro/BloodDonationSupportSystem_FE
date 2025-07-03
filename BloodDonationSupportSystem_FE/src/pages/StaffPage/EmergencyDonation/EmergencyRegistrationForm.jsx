import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material"
import { Emergency, Person, Phone, Bloodtype, LocalHospital } from "@mui/icons-material"

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const volumeOptions = ["250ml", "350ml", "450ml", "500ml", "750ml", "1000ml"]
const urgencyLevels = [
  { value: "critical", label: "Khẩn cấp" },
  { value: "urgent", label: "Rất khẩn cấp" },
  { value: "moderate", label: "Cực kỳ khẩn cấp" },
]

export function EmergencyRegistrationForm() {
  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        borderRadius: 3,
      }}
    >
      <CardHeader
        sx={{
          background: "linear-gradient(135deg, #d32f2f 0%, #f44336 100%)",
          color: "white",
          textAlign: "center",
        }}
        title={
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
            <Emergency sx={{ fontSize: 32 }} />
            <Typography variant="h5" component="h1" fontWeight="bold">
              Đăng ký trường hợp khẩn cấp
            </Typography>
          </Box>
        }
        subheader={
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)", mt: 1 }}>
            Vui lòng điền đầy đủ thông tin để tạo yêu cầu hiến máu khẩn cấp
          </Typography>
        }
      />

      <CardContent>
        <form>

          {/* Thông tin bệnh nhân */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1}>
              <Person sx={{ color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="600" color="#1976d2">
                Thông tin bệnh nhân
              </Typography>
            </Box>
            <Divider />
          </Grid>

          <Grid container spacing={2} mt={2} >

            <Grid item xs={12} md={6} width={375}>
              <Typography fontWeight="bold" fontSize={14} gutterBottom>
                Tên bệnh nhân
              </Typography>
              <TextField fullWidth required />
            </Grid>

            <Grid item xs={12} md={6} width={375}>
              <Typography fontWeight="bold" fontSize={14} gutterBottom>
                Tên người thân
              </Typography>
              <TextField fullWidth required />
            </Grid>
          </Grid>


          {/* Thông tin liên hệ */}
          <Grid item xs={12} mt={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Phone sx={{ color: "#1976d2" }} />
              <Typography variant="h6" fontWeight="600" color="#1976d2">
                Thông tin liên hệ
              </Typography>
            </Box>
            <Divider />
          </Grid>


          <Grid container spacing={2} mt={2}>

            <Grid item xs={12} md={6} width={375}>
              <Typography fontWeight="bold" fontSize={14} gutterBottom>
                Số điện thoại
              </Typography>
              <TextField fullWidth required />
            </Grid>

            <Grid item xs={12} md={6} width={375}>
              <Typography fontWeight="bold" fontSize={14} gutterBottom>
                Địa điểm bệnh nhân
              </Typography>
              <TextField fullWidth required />
            </Grid>
          </Grid>

          {/* Thông tin y tế */}
          <Grid item xs={12} mt={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Bloodtype sx={{ color: "#d32f2f" }} />
              <Typography variant="h6" fontWeight="600" color="#d32f2f">
                Thông tin y tế
              </Typography>
            </Box>
            <Divider />
          </Grid>

          <Grid container spacing={2} mt={2}>

            <Grid item xs={12} md={6} width={245}>
              <Typography fontWeight="bold" fontSize={14} gutterBottom>
                Nhóm máu cần thiết
              </Typography>
              <FormControl fullWidth required>

                <Select >
                  {bloodTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      <Chip label={type} size="small" />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} width={245}>
              <Typography fontWeight="bold" fontSize={14} gutterBottom>
                Lượng máu cần thiết
              </Typography>
              <FormControl fullWidth required>

                <Select >
                  {volumeOptions.map((volume) => (
                    <MenuItem key={volume} value={volume}>
                      {volume}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} width={245}>
              <Typography fontWeight="bold" fontSize={14} gutterBottom>
                Mức độ khẩn cấp
              </Typography>
              <FormControl fullWidth required>

                <Select >
                  {urgencyLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} width={800}>
              <Typography fontWeight="bold" fontSize={14} gutterBottom>
                Ghi chú
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Thông tin bổ sung về tình trạng bệnh nhân, yêu cầu đặc biệt..."
              />
            </Grid>
          </Grid>

          {/* Thông tin nhân viên */}
          <Grid item xs={12} mt={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <LocalHospital sx={{ color: "#388e3c" }} />
              <Typography variant="h6" fontWeight="600" color="#388e3c">
                Thông tin nhân viên
              </Typography>
            </Box>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6} mt={2} width={770}>
            <Typography fontWeight="bold" fontSize={14} gutterBottom>
              Đăng ký bởi nhân viên
            </Typography>
            <TextField fullWidth value="BS. Nguyễn Văn A" disabled />
          </Grid>

          <Grid item xs={12} mt={2}>
            <FormControlLabel
              control={<Checkbox required />}
              label="Tôi đã kiểm tra và xác nhận thông tin trên là đúng."
            />
          </Grid>

          {/* Buttons */}
          <Grid item xs={12} mt={3}>
            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined">Hủy bỏ</Button>
              <Button variant="contained">Tạo yêu cầu khẩn cấp</Button>
            </Box>
          </Grid>

        </form>
      </CardContent>
    </Card>
  )
}
