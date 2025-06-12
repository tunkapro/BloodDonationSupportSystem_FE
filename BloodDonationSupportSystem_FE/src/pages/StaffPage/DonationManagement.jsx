import  { useState } from 'react';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography,
  List,
  ListItem,
  Button,
  Chip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Menu,
  MenuItem,
  TextField,
  Container,
  Divider
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DonationManagement = () => {
  const [value, setValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [dialogType, setDialogType] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [collectedAmount, setCollectedAmount] = useState('');
  const [amountError, setAmountError] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartProcess = (donor) => {
    setSelectedDonor(donor);
    setDialogType('startScreening');
    setOpenDialog(true);
  };

  const handleUpdateStatusClick = (event, donor) => {
    setAnchorEl(event.currentTarget);
    setSelectedDonor(donor);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusOptionClick = (option) => {
    handleMenuClose();
    setDialogType(option);
    setOpenDialog(true);
    setCollectedAmount('');
    setAmountError('');
  };

  const validateAmount = (amount) => {
    const numAmount = Number(amount);
    if (!amount || amount.trim() === '') {
      return 'Amount is required';
    }
    if (isNaN(numAmount)) {
      return 'Amount must be a number';
    }
    if (numAmount <= 0) {
      return 'Amount must be greater than 0';
    }
    if (numAmount > 1000) {
      return 'Amount cannot exceed 1000ml';
    }
    return '';
  };

  const handleConfirmAction = () => {
    switch (dialogType) {
      case 'startScreening':
        console.log(`Moving donor ${selectedDonor.name} to Screening stage`);
        break;
      case 'screeningFail':
        console.log(`Marking ${selectedDonor.name}'s screening as Failed`);
        break;
      case 'screeningPass':
        console.log(`Moving donor ${selectedDonor.name} to Collecting stage`);
        break;
      case 'collectingFail':
        console.log(`Marking ${selectedDonor.name}'s collection as Failed`);
        break;
      case 'collectingComplete':
        const error = validateAmount(collectedAmount);
        if (error) {
          setAmountError(error);
          return;
        }
        console.log(`Completing ${selectedDonor.name}'s donation with ${collectedAmount}ml collected`);
        break;
    }
    setOpenDialog(false);
    setSelectedDonor(null);
    setDialogType('');
    setCollectedAmount('');
    setAmountError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDonor(null);
    setDialogType('');
    setCollectedAmount('');
    setAmountError('');
  };

  const waitingDonors = [
    { id: 'D-1028', name: 'Emily Wilson', time: '10:15 AM', status: 'Pending' },
    { id: 'D-1029', name: 'James Brown', time: '10:30 AM', status: 'Pending' },
    { id: 'D-1030', name: 'Sophia Martinez', time: '10:45 AM', status: 'Pending' }
  ];

  const inProgressDonors = [
    { id: 'D-1023', name: 'John Smith', time: '09:30 AM', status: 'Collecting' },
    { id: 'D-1024', name: 'Maria Garcia', time: '09:45 AM', status: 'Screening' },
    { id: 'D-1025', name: 'David Lee', time: '10:00 AM', status: 'Screening' }
  ];

  const completedDonors = [
    { id: 'D-1020', name: 'Sarah Johnson', time: '09:00 AM', amount: '450ml' },
    { id: 'D-1021', name: 'Michael Wong', time: '09:15 AM', amount: '450ml' },
    { id: 'D-1022', name: 'Lisa Taylor', time: '09:30 AM', amount: '450ml' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#1976d2'; // blue
      case 'Screening':
        return '#ffc107'; // yellow
      case 'Collecting':
        return '#9c27b0'; // purple
      default:
        return '#4caf50'; // green (for completed)
    }
  };

  const getDialogContent = () => {
    switch (dialogType) {
      case 'startScreening':
        return {
          title: 'Confirm Process Start',
          content: `Do you want to move ${selectedDonor?.name} to the Screening step?`
        };
      case 'screeningFail':
        return {
          title: 'Confirm Screening Failure',
          content: `Are you sure you want to mark ${selectedDonor?.name}'s screening as failed?`
        };
      case 'screeningPass':
        return {
          title: 'Confirm Screening Passed',
          content: `Do you want to move ${selectedDonor?.name} to the Collecting step?`
        };
      case 'collectingFail':
        return {
          title: 'Confirm Collection Failure',
          content: `Are you sure you want to mark ${selectedDonor?.name}'s collection as failed?`
        };
      case 'collectingComplete':
        return {
          title: 'Complete Blood Collection',
          content: 'Please enter the amount of blood collected:'
        };
      default:
        return { title: '', content: '' };
    }
  };

  const renderDonorItem = (donor, type) => {
    return (
      <ListItem
        key={donor.id}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #eee',
          py: 3,
          px: 3,
          '&:hover': {
            bgcolor: 'rgba(0, 0, 0, 0.02)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              bgcolor: 'primary.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <PersonIcon sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
              {donor.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {donor.id}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {donor.time}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {type === 'completed' ? (
            <Chip 
              label="Completed"
              color="success"
              sx={{ 
                minWidth: '100px',
                height: '32px',
                '& .MuiChip-label': {
                  fontSize: '0.875rem',
                }
              }}
            />
          ) : (
            <Chip 
              label={donor.status}
              sx={{ 
                minWidth: '100px',
                height: '32px',
                bgcolor: getStatusColor(donor.status),
                color: 'white',
                '& .MuiChip-label': {
                  fontSize: '0.875rem',
                }
              }}
            />
          )}
          {type !== 'completed' && (
            <>
              <Button 
                variant="outlined"
                size="medium"
                sx={{ 
                  minWidth: '130px',
                  height: '36px',
                  borderRadius: '18px',
                  textTransform: 'none',
                  fontWeight: 500
                }}
                onClick={(e) => 
                  type === 'waiting' 
                    ? handleStartProcess(donor)
                    : handleUpdateStatusClick(e, donor)
                }
              >
                {type === 'waiting' ? 'Start Process' : 'Update Status'}
              </Button>
              {(donor.status === 'Screening' || donor.status === 'Collecting') && (
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedDonor?.id === donor.id}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 3,
                    sx: { 
                      mt: 1,
                      minWidth: 120,
                      '& .MuiMenuItem-root': {
                        py: 1.5
                      }
                    }
                  }}
                >
                  <MenuItem 
                    onClick={() => handleStatusOptionClick(
                      donor.status === 'Screening' ? 'screeningFail' : 'collectingFail'
                    )}
                    sx={{ color: 'error.main' }}
                  >
                    Fail
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem 
                    onClick={() => handleStatusOptionClick(
                      donor.status === 'Screening' ? 'screeningPass' : 'collectingComplete'
                    )}
                    sx={{ color: 'success.main' }}
                  >
                    {donor.status === 'Screening' ? 'Passed' : 'Completed'}
                  </MenuItem>
                </Menu>
              )}
            </>
          )}
          {type === 'completed' && (
            <Typography 
              color="success.main"
              sx={{ 
                fontSize: '0.875rem',
                fontWeight: 500,
                bgcolor: 'success.light',
                px: 2,
                py: 1,
                borderRadius: 2
              }}
            >
              {donor.amount} collected
            </Typography>
          )}
        </Box>
      </ListItem>
    );
  };

  const dialogContent = getDialogContent();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 600,
            color: 'primary.main',
            mb: 1
          }}
        >
          Blood Donation Manager
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Monitor and manage blood donation processes in real-time
        </Typography>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          bgcolor: 'background.default', 
          px: 2 
        }}>
          <Tabs 
            value={value} 
            onChange={handleChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                py: 2,
                minHeight: '48px'
              }
            }}
          >
            <Tab label={`Active Donations (${waitingDonors.length})`} />
            <Tab label={`In Progress (${inProgressDonors.length})`} />
            <Tab label={`Completed (${completedDonors.length})`} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary" 
            sx={{ 
              mb: 3,
              px: 2,
              fontSize: '0.875rem'
            }}
          >
            Donors waiting to be processed
          </Typography>
          <Paper 
            elevation={0}
            sx={{ 
              bgcolor: 'background.paper',
              borderRadius: 2
            }}
          >
            <List disablePadding>
              {waitingDonors.map(donor => renderDonorItem(donor, 'waiting'))}
            </List>
          </Paper>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary"
            sx={{ 
              mb: 3,
              px: 2,
              fontSize: '0.875rem'
            }}
          >
            Donations currently being processed
          </Typography>
          <Paper 
            elevation={0}
            sx={{ 
              bgcolor: 'background.paper',
              borderRadius: 2
            }}
          >
            <List disablePadding>
              {inProgressDonors.map(donor => renderDonorItem(donor, 'progress'))}
            </List>
          </Paper>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography 
            variant="subtitle2" 
            color="text.secondary"
            sx={{ 
              mb: 3,
              px: 2,
              fontSize: '0.875rem'
            }}
          >
            Recently completed donations
          </Typography>
          <Paper 
            elevation={0}
            sx={{ 
              bgcolor: 'background.paper',
              borderRadius: 2
            }}
          >
            <List disablePadding>
              {completedDonors.map(donor => renderDonorItem(donor, 'completed'))}
            </List>
          </Paper>
        </TabPanel>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          {dialogContent.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description" sx={{ mb: dialogType === 'collectingComplete' ? 2 : 0 }}>
            {dialogContent.content}
          </DialogContentText>
          {dialogType === 'collectingComplete' && (
            <TextField
              autoFocus
              margin="dense"
              label="Blood Amount (ml)"
              type="number"
              fullWidth
              variant="outlined"
              value={collectedAmount}
              onChange={(e) => {
                setCollectedAmount(e.target.value);
                setAmountError('');
              }}
              error={Boolean(amountError)}
              helperText={amountError}
              InputProps={{
                inputProps: { 
                  min: 0,
                  max: 1000
                }
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button 
            onClick={handleCloseDialog}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmAction}
            variant="contained"
            color={dialogType.includes('Fail') ? 'error' : 'primary'}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DonationManagement; 