import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import {
    DatePicker,
    LocalizationProvider,
    TimeField
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import viLocale from 'date-fns/locale/vi'; // Tiếng Việt
import axios from 'axios';


const BloodDonationScheduleCreate = () => {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm();

    const addSchedule = async (data) => {
        try {
            const res = await axios.post('http://localhost:3001/BloodSchedule', data);
            if (res.data) {
                console.log("sucess");
            }
        } catch (err) {
            console.log("eror");
        }

    }
    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            operatingDate: data.operatingDate?.toLocaleDateString('vi-VN'),
            startTime: data.startTime?.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            endTime: data.endTime?.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        console.log('Dữ liệu tạo ra:', formattedData);
        addSchedule(formattedData);
        reset();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <Container maxWidth="sm" >
                <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Tạo Sự Kiện Hiến Máu
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            label="Tiêu đề"
                            fullWidth
                            {...register('title', { required: 'Tiêu đề là bắt buộc' })}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />

                        <TextField
                            label="Địa chỉ"
                            fullWidth
                            margin='normal'
                            {...register('address', { required: 'Địa chỉ là bắt buộc' })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />

                        <Controller
                            name="operatingDate"
                            control={control}
                            defaultValue={null}
                            rules={{ required: 'Ngày hoạt động là bắt buộc' }}
                            render={({ field }) => (
                                <DatePicker
                                    label="Ngày hoạt động"
                                    value={field.value}
                                    onChange={field.onChange}
                                    sx={{ marginTop: '10px' }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            margin: 'normal',
                                            error: !!errors.operatingDate,
                                            helperText: errors.operatingDate?.message,
                                        },
                                    }}
                                />
                            )}
                        />

                        <Box display={'flex'} gap={2} marginTop={2}>
                            <Controller
                                name="startTime"
                                control={control}
                                defaultValue={null}
                                rules={{ required: 'Giờ bắt đầu là bắt buộc' }}
                                render={({ field }) => (
                                    <TimeField
                                        label="Giờ kết thúc"
                                        value={field.value}
                                        onChange={field.onChange}
                                        format="HH:mm"
                                        error={!!errors.startTime}
                                        helperText={errors.startTime?.message}
                                    />


                                )}
                            />

                            <Controller
                                name="endTime"
                                control={control}
                                defaultValue={null}
                                rules={{ required: 'Giờ kết thúc là bắt buộc' }}
                                render={({ field }) => (
                                    <TimeField
                                        label="Giờ kết thúc"
                                        value={field.value}
                                        onChange={field.onChange}
                                        format="HH:mm"
                                        error={!!errors.endTime}
                                        helperText={errors.endTime?.message}
                                    />
                                )}
                            />
                        </Box>
                        <TextField
                            label="Số lượng tối đa"
                            fullWidth
                            sx={{display : 'none'}}
                            type='number'
                            defaultValue={0}
                            margin="normal"
                            {...register('numberRegister')}
                        />
                        <TextField
                            label="Số lượng tối đa"
                            fullWidth
                            type='number'
                            margin="normal"
                            {...register('capcity', { required: 'Bắt buộc' })}
                            error={!!errors.capcity}
                            helperText={errors.capcity?.message}
                        />

                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                            Tạo Sự Kiện
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </LocalizationProvider>
    );
};

export default BloodDonationScheduleCreate;
