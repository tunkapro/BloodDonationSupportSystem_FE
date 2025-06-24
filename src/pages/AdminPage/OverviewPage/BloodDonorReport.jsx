
import { Grid, Paper, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export default function BloodDonorReport() {
  return (
    <Grid container>
      <Grid container size={12} justifyContent={'center'}>
        <Grid size={3}> 
          <Paper>
            <Typography>Thành viên</Typography>
          </Paper>
        </Grid>
        <Grid size={3}> 
          <Paper>
            <Typography>Thành viên</Typography>
          </Paper>
        </Grid>
        <Grid size={3}> 
          <Paper>
            <Typography>Thành viên</Typography>
          </Paper>
        </Grid>
        <Grid size={3}> 
          <Paper>
            <Typography>Thành viên</Typography>
          </Paper>
        </Grid>
      </Grid>
      
    </Grid>
  );
}
