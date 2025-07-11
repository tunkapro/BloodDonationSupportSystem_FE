import axios from "../config/axios";
import { format } from 'date-fns';

export const ManagementAPI = {
    // chứa tất cả API ở đây để sử dụng. Đặt tạo class đặt static function cũng đc.
      getOverviewStatistics: async (year, month) => {
  
    const body = { year, month };
    console.log(body)
    const res = await axios.post('/admin/report/overview', body);
    return res.data;
  },

  getAllArticles: async () => {
    const res = await axios.get('/homepage/articles');
    return res.data;
  },
  getDonationDataByYearForChart: async (year, month) => {
    const body = { year, month };
    const res = await axios.post('/admin/report/monthly-statistic', body);
    return res.data;
  },
  exportDonationRegistrationReport :async (fromDate, toDate) => {
    const body = { fromDate, toDate };
    const response = await axios.post(
      '/api/admin/reports/donation-registration/export',
      body,
      {
        responseType: 'blob', // để nhận file Excel
      }
    );
  
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'donation_registration_report.xlsx');
    document.body.appendChild(link);
    link.click();
  },
  exportBloodInventory: async () => {
    const response = await axios.get(
      '/admin/report/blood-inventory/export',
      {
        responseType: 'blob', // để nhận file Excel
      }
    );
  
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'blood_inventory_report.xlsx');
    document.body.appendChild(link);
    link.click();
  },
  getBloodInventory: async () => {
    const response = await axios.get('/admin/reports/inventory');
    return response.data;
  },
  getBloodDonationReport: async (fromDate, toDate) => {
    const body = { fromDate, toDate };
    const response = await axios.post('/admin/report/blood-donation', body);
    return response.data;
  }
}