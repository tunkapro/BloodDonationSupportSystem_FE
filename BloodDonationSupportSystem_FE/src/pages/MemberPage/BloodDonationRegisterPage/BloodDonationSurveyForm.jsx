import React from 'react';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

export default function BloodDonationSurveyForm({ data }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    console.log('Dữ liệu đăng ký:', formData);
    // TODO: Gửi lên server hoặc xử lý tiếp
  };

  const questions = [
    '1. Anh/chị từng hiến máu chưa?',
    '2. Hiện tại, anh/chị có mắc bệnh lí nào không?',
    '3. Trước đây, anh/chị có từng mắc một trong các bệnh: viêm gan siêu vi B, C, HIV, vảy nến, phì đại tiền liệt tuyến, sốc phản vệ, tai biến mạch máu não, nhồi máu cơ tim, lupus ban đỏ, động kinh, ung thư, hen, được cấy ghép mô tạng?',
    '4. Trong 12 tháng gần đây, anh/chị có phẫu thuật hoặc điều trị nha khoa không?',
    '5. Trong 01 tháng gần đây, anh/chị có thay đổi sức khỏe không?',
    '6. Trong 14 ngày gần đây, anh/chị có tiếp xúc nguồn lây bệnh không?',
    '7. Trong 07 ngày gần đây, anh/chị có triệu chứng bất thường không?',
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: 1,
          width: '100%',
          maxWidth: '1200px',
          marginTop: 10,
        }}
      >
        <Grid container spacing={3}>
          {/* Bên trái: Thông tin cá nhân */}
          <Grid item xs={12} md={5} sx={{display: 'flex', gap: 3, flexWrap: 'wrap'}}>
            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 1, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, textTransform: 'uppercase' }} color="info">
                Thông tin cá nhân
              </Typography>
              {[
                ['Họ và tên', 'PHẠM ĐĂNG QUANG'],
                ['Ngày sinh', '02/01/2004'],
                ['Giới tính', 'Nam'],
                ['Nghề nghiệp', 'Sinh viên'],
                ['Nhóm máu', 'O+'],
              ].map(([label, value], idx) => (
                <Typography key={idx} sx={{ mb: 2 }}>
                  <strong>{label}:</strong> {value}
                </Typography>
              ))}
              {[
                ['Địa chỉ liên hệ', '3/26/28, P. Bình Hưng Hòa, Q. Bình Tân, TP HCM'],
                ['Điện thoại di động', null],
                ['Email', null],
              ].map(([label, value], idx) => (
                <Typography key={idx} sx={{ mb: 2 }}>
                  <strong>{label}:</strong> {value}
                </Typography>
              ))}
            </Box>

            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
              <Typography variant="h6" gutterBottom sx={{ mb: 2, textTransform: 'uppercase' }} color="info">
                Lịch Hiến Máu
              </Typography>
              <Typography sx={{ mb: 2 }}>
                <strong>Sự kiện:</strong> {data?.title}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                <strong>Địa chỉ:</strong> {data?.address}
              </Typography>
            </Box>
          </Grid>

          {/* Bên phải: Phiếu đăng ký */}
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, boxShadow: 1}}>
              <Typography variant="h6" gutterBottom color="info" sx={{ textTransform: 'uppercase' }}>
                Phiếu đăng ký hiến máu
              </Typography>

              <FormControl sx={{ mt: 1 }}>
                {[
                  '1. Anh/chị từng hiến máu chưa?',
                  '2. Hiện tại, anh/chị có mắc bệnh lí nào không?',
                  '3. Trước đây, anh/chị có từng mắc một trong các bệnh: viêm gan siêu vi B, C, HIV, vảy nến, phì đại tiền liệt tuyến, sốc phản vệ, tai biến mạch máu não, nhồi máu cơ tim, lupus ban đỏ, động kinh, ung thư, hen, được cấy ghép mô tạng ?',
                  '4. Trong 12 tháng gần đây, anh/chị có phẫu thuật hoặc điều trị nha khoa không?',
                  '5. Trong 01 tháng gần đây, anh/chị có thay đổi sức khỏe không?',
                  '6. Trong 14 ngày gần đây, anh/chị có tiếp xúc nguồn lây bệnh không?',
                  '7. Trong 07 ngày gần đây, anh/chị có triệu chứng bất thường không?',
                ].map((question, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box >
                      <FormLabel
                        component="legend"
                        sx={{
                          mb: 0.5,
                          color: 'black',
                          '&.Mui-focused': { color: 'black' },
                          fontWeight: 'bold',    
                          whiteSpace: 'normal', // Cho phép xuống dòng
                          wordBreak: 'break-word' // Nếu có từ dài
                        }}
                      >
                        {question}
                      </FormLabel>
                    </Box>
                    <Controller
                      name={`question-${index}`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <RadioGroup row {...field} sx={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                        }}>
                          <FormControlLabel value="yes" control={<Radio />} label="Có" />
                          <FormControlLabel value="no" control={<Radio />} label="Không" />
                        </RadioGroup>
                      )}
                    />
                  </Box>
                ))}
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
          onClick={handleSubmit(onSubmit)}
        >
          Xác nhận đăng ký
        </Button>
      </Box>
    </Box>
  );
}
