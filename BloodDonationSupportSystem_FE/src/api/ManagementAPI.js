import axios from "../config/axios";

export const ManagementAPI = {
    // chứa tất cả API ở đây để sử dụng. Đặt tạo class đặt static function cũng đc.
      getOverviewStatistics: async (year, month) => {
    // month can be 'all' or a number
    const body = { year, month };
    const res = await axios.post('/admin/overview', body);
    return res.data;
  },

  getAllArticles: async () => {
    const res = await axios.get('/homepage/articles');
    return res.data;
  }

}