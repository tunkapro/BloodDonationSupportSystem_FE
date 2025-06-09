// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// export default function AutoOpenDatePicker() {
//   const [value, setValue] = React.useState(null);
//   const [open, setOpen] = React.useState(false);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <DatePicker
//         label="Ngày cần chọn"
//         value={value}
//         onChange={(newValue) => setValue(newValue)}
//         open={open}
//         onOpen={() => setOpen(true)}
//         onClose={() => setOpen(false)}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             onFocus={() => setOpen(true)} // 👈 mở khi focus
//             fullWidth
//           />
//         )}
//       />
//     </LocalizationProvider>
//   );
// }
