import axios from "axios"


export const ManagementAPI = {
    // chứa tất cả API ở đây để sử dụng. Đặt tạo class đặt static function cũng đc.
    getNews: async () => {
        try {
            const res = await axios.get('http://localhost:3001/newsList');
            if (res.data) {
              
                return res.data
            }
        }catch(err){
            console.log("error")
        }
    }
}