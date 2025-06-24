
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import {Navigation} from '../ProcessManagement/Navigation';
import FilterBarHealthCheck from '../ProcessManagement/FilterBarHealthCheck';
import DonorTableHealthCheck from '../ProcessManagement/DonorTableHealthCheck';
import UpdateHealthCheck from '../ProcessManagement/UpdateHealthCheck';
import CancelDonor from '../ProcessManagement/CancelDonor';




export default function DonorHealthCheckPage() {

  const mockDonors = [
    {
      donationRegistrationId: "1",
      donorFullName: "Nguyễn Văn A",
      registrationDate: "2025-06-20T08:00:00Z",
      donationEmergencyId: "E001",
      registrationStatus: "CHƯA HIẾN",
      healthCheckStatus: "CHỜ ĐỢI",
      height: 170,
      weight: 60,
      bloodType: "O+",
      staffFullName: "Bác sĩ Trần Văn B",
      addressHospital: "Bệnh viện Chợ Rẫy",
    },
    {
      donationRegistrationId: "2",
      donorFullName: "Trần Thị B",
      registrationDate: "2025-06-18T14:00:00Z",
      donationEmergencyId: null,
      registrationStatus: "ĐÃ HIẾN",
      healthCheckStatus: "ĐÃ ĐẠT",
      height: 160,
      weight: 52,
      bloodType: "A-",
      staffFullName: "Điều dưỡng Lê Thị C",
      addressHospital: "Bệnh viện 115",
    },
    {
      donationRegistrationId: "3",
      donorFullName: "Lê Văn C",
      registrationDate: "2025-06-18T10:30:00Z",
      donationEmergencyId: "E002",
      registrationStatus: "HỦY",
      healthCheckStatus: "CHƯA ĐẠT",
      height: 175,
      weight: 68,
      bloodType: "B+",
      staffFullName: null,
      addressHospital: null,
    },
  ]

  const [donors, setDonors] = useState(mockDonors);

  //   useEffect(() => {
  //     getAllDonors()
  //       .then(data => setDonors(data))
  //       .catch(err => console.error('Lỗi load danh sách:', err));
  //   }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [cancelDonorOpen, setCancelDonorOpen] = useState(false);
  const [selectedCancelDonor, setSelectedCancelDonor] = useState(null);


  // ✅ Lọc dữ liệu theo search và filter
  const filteredDonors = donors.filter((donor) => {
    const matchesSearch = donor.donorFullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || donor.registrationDate.startsWith(dateFilter);
    const matchesPriority =
      priorityFilter === 'all' ||
      (priorityFilter === 'KHẨN CẤP' && donor.donationEmergencyId) ||
      (priorityFilter === 'THÔNG THƯỜNG' && !donor.donationEmergencyId);
    return matchesSearch && matchesDate && matchesPriority;
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

  console.log('Filtered Donors:', filteredDonors);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>

      <Box>
        <Navigation />
      </Box>

      {/* ✅ Thanh tìm kiếm + lọc */}
      <Box mb={3} mt={3}>
        <FilterBarHealthCheck
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />
      </Box>

      {/* ✅ Bảng danh sách */}
      <DonorTableHealthCheck donors={filteredDonors} onEditDonor={setSelectedDonor} onCancelDonor={handleCancelDonorClick}/>

      {/* ✅ Dialog cập nhật */}
      <UpdateHealthCheck
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