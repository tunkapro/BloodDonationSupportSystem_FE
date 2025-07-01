
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { Navigation } from '../ProcessManagement/Navigation';
import FilterBarHealthCheck from '../ProcessManagement/FilterBarHealthCheck';
import DonorTableHealthCheck from '../ProcessManagement/DonorTableHealthCheck';
import UpdateHealthCheck from '../ProcessManagement/UpdateHealthCheck';
import CancelDonor from '../ProcessManagement/CancelDonor';
import { getHealthChecksApi } from '../../../api/healthcheckService';




export default function DonorHealthCheckPage() {

  // const mockDonors = [
  //   {
  //     donationRegistrationId: "1",
  //     donorFullName: "Nguyễn Văn A",
  //     registrationDate: "2025-06-20T08:00:00Z",
  //     donationEmergencyId: "E001",
  //     registrationStatus: "CHƯA HIẾN",
  //     healthCheckStatus: "CHỜ ĐỢI",
  //     height: 170,
  //     weight: 60,
  //     bloodType: "O+",
  //     staffFullName: "Bác sĩ Trần Văn B",
  //     addressHospital: "Bệnh viện Chợ Rẫy",
  //   },
  //   {
  //     donationRegistrationId: "2",
  //     donorFullName: "Trần Thị B",
  //     registrationDate: "2025-06-18T14:00:00Z",
  //     donationEmergencyId: null,
  //     registrationStatus: "CHƯA HIẾN",
  //     healthCheckStatus: "ĐÃ ĐẠT",
  //     height: 160,
  //     weight: 52,
  //     bloodType: "A-",
  //     staffFullName: "Điều dưỡng Lê Thị C",
  //     addressHospital: "Bệnh viện 115",
  //   },
  //   {
  //     donationRegistrationId: "3",
  //     donorFullName: "Lê Văn C",
  //     registrationDate: "2025-06-18T10:30:00Z",
  //     donationEmergencyId: "E002",
  //     registrationStatus: "CHƯA HIẾN",
  //     healthCheckStatus: "CHƯA ĐẠT",
  //     height: 175,
  //     weight: 68,
  //     bloodType: "B+",
  //     staffFullName: null,
  //     addressHospital: null,
  //   },
  // ]

  const [donors, setDonors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthChecks = async () => {
      try {
        const response = await getHealthChecksApi();

        const urgencyPriority = {
          "CỰC KỲ KHẨN CẤP": 1,
          "RẤT KHẨN CẤP": 2,
          "KHẨN CẤP": 3,
          "THÔNG THƯỜNG": 4,
        };

        const sortedDonors = response.data
          .map((item) => ({
            ...item,
            levelOfUrgency: item.levelOfUrgency || "BÌNH THƯỜNG",
          }))
          .sort((a, b) => {
            const priorityA = urgencyPriority[a.levelOfUrgency] || 4;
            const priorityB = urgencyPriority[b.levelOfUrgency] || 4;
            return priorityA - priorityB;
          });

        setDonors(sortedDonors);
      } catch (err) {
        console.error("Lỗi gọi API health checks:", err);
        setError("Không thể tải danh sách kiểm tra sức khỏe.");
      }
    };

    fetchHealthChecks();
  }, []);

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

    const urgency = donor.levelOfUrgency || "BÌNH THƯỜNG"; // Gán mặc định nếu null

    const matchesPriority =
      priorityFilter === "all" ||
      (priorityFilter === "BÌNH THƯỜNG" && urgency === "BÌNH THƯỜNG") ||
      urgency === priorityFilter;
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
      <DonorTableHealthCheck donors={filteredDonors} onEditDonor={setSelectedDonor} onCancelDonor={handleCancelDonorClick} />

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