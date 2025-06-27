
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Navigation } from '../ProcessManagement/Navigation';
import DonorTableProcess from '../ProcessManagement/DonorTableProcess';
import UpdateProcess from '../ProcessManagement/UpdateProcess';
import FilterBarProcess from '../ProcessManagement/FilterBarProcess';
import CancelDonor from '../ProcessManagement/CancelDonor';


export default function DonorProcessPage() {

  const mockDonors = [
    {
      donationRegistrationId: '1',
      donorFullName: 'Nguyễn Văn A',
      registrationDate: '2025-06-20T00:00:00.000Z',
      donationEmergencyId: 'emergency-1',
      registrationStatus: 'ĐÃ DUYỆT',
      processStatus: 'ĐANG XỬ LÍ',
      bloodType: 'A+',
      volumeMl: 450,
    },
    {
      donationRegistrationId: '2',
      donorFullName: 'Trần Thị B',
      registrationDate: '2025-06-18T00:00:00.000Z',
      donationEmergencyId: null,
      registrationStatus: 'CHỜ DUYỆT',
      processStatus: 'CHỜ ĐỢI',
      bloodType: 'O-',
      volumeMl: null,
    },
    {
      donationRegistrationId: '3',
      donorFullName: 'Lê Văn C',
      registrationDate: '2025-06-15T00:00:00.000Z',
      donationEmergencyId: null,
      registrationStatus: 'ĐÃ DUYỆT',
      processStatus: 'ĐÃ HIẾN',
      bloodType: 'B+',
      volumeMl: 350,
    },
    {
      donationRegistrationId: '4',
      donorFullName: 'Phạm Thị D',
      registrationDate: '2025-06-19T00:00:00.000Z',
      donationEmergencyId: 'emergency-2',
      registrationStatus: 'ĐÃ DUYỆT',
      processStatus: 'CHỜ ĐỢI',
      bloodType: 'AB+',
      volumeMl: null,
    },
    {
      donationRegistrationId: '5',
      donorFullName: 'Hoàng Minh E',
      registrationDate: '2025-06-21T00:00:00.000Z',
      donationEmergencyId: null,
      registrationStatus: 'HUỶ',
      processStatus: 'CHỜ ĐỢI',
      bloodType: null,
      volumeMl: null,
    },
  ];


  const [donors, setDonors] = useState(mockDonors);

  //   useEffect(() => {
  //     getAllDonors()
  //       .then(data => setDonors(data))
  //       .catch(err => console.error('Lỗi load danh sách:', err));
  //   }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [processStatusFilter, setProcessStatusFilter] = useState('all');
  const [bloodTypeFilter, setBloodTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [cancelDonorOpen, setCancelDonorOpen] = useState(false);
  const [selectedCancelDonor, setSelectedCancelDonor] = useState(null);

  // ✅ Lọc dữ liệu theo search và filter
  const filteredDonors = donors.filter((donor) => {
    const matchesSearch = donor.donorFullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProcessStatus = processStatusFilter === 'all' || donor.processStatus === processStatusFilter;
    const matchesDate = !dateFilter || donor.registrationDate.startsWith(dateFilter);
    const matchesBloodType = bloodTypeFilter === 'all' || donor.bloodType === bloodTypeFilter;
    const matchesPriority =
      priorityFilter === 'all' ||
      (priorityFilter === 'KHẨN CẤP' && donor.donationEmergencyId) ||
      (priorityFilter === 'THÔNG THƯỜNG' && !donor.donationEmergencyId);
    return matchesSearch && matchesProcessStatus && matchesBloodType && matchesDate && matchesPriority;
  });

   const handleCancelDonorClick = (donor) => {
    setSelectedCancelDonor(donor);
    setCancelDonorOpen(true);
  };



  const handleSaveDonor = (updatedDonor) => {
    setDonors((prev) =>
      prev.map((d) => (d.donationRegistrationId === updatedDonor.donationRegistrationId ? updatedDonor : d))
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

      <Box>
        <Navigation />
      </Box>

      {/* ✅ Thanh tìm kiếm + lọc */}
      <Box mb={3} mt={3}>
        <FilterBarProcess
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          processStatusFilter={processStatusFilter}
          setProcessStatusFilter={setProcessStatusFilter}
          bloodTypeFilter={bloodTypeFilter}
          setBloodTypeFilter={setBloodTypeFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
      </Box>

      {/* ✅ Bảng danh sách */}
      <DonorTableProcess donors={filteredDonors} onEditDonor={setSelectedDonor} onCancelDonor={handleCancelDonorClick}/>

      {/* ✅ Dialog cập nhật */}
      <UpdateProcess
        isOpen={!!selectedDonor}
        onClose={() => setSelectedDonor(null)}
        donor={selectedDonor}
        onSave={handleSaveDonor}
        onDonorChange={(updated) => setSelectedDonor(updated)}
      />

      <CancelDonor
        open={cancelDonorOpen}
        onClose={() => setCancelDonorOpen(false)}
        donor={selectedCancelDonor}
        onSave={handleSaveDonor}
      />
    </Container>
  );
}