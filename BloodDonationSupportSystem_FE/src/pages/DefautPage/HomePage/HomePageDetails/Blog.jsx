import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const blogPosts = [
  {
    title: "Kinh nghiệm đi hiến máu lần đầu",
    description:
      "Chia sẻ những điều cần chuẩn bị trước khi hiến máu, giúp bạn tự tin và an tâm.",
    content: `Nếu bạn lần đầu đi hiến máu, hãy chuẩn bị giấy tờ tùy thân, nghỉ ngơi đầy đủ trước ngày hiến máu và uống nhiều nước. Đừng quá lo lắng vì quá trình hiến máu rất nhanh và an toàn.`
  },
  {
    title: "Chế độ ăn trước và sau hiến máu",
    description:
      "Tìm hiểu các loại thực phẩm nên và không nên ăn trước/sau khi hiến máu.",
    content: `Trước khi hiến máu, bạn nên ăn nhẹ, tránh đồ chiên nhiều dầu mỡ và không uống rượu bia. Sau hiến máu, hãy uống nhiều nước, ăn thức ăn giàu sắt như thịt đỏ, rau xanh đậm và nghỉ ngơi hợp lý.`
  },
  {
    title: "Vì sao nên hiến máu định kỳ?",
    description:
      "Hiến máu không chỉ cứu người mà còn mang lại lợi ích sức khỏe cho bản thân bạn.",
    content: `Hiến máu định kỳ giúp kích thích tủy xương sản sinh máu mới, kiểm tra sức khỏe định kỳ miễn phí và quan trọng nhất là góp phần cứu sống người bệnh cần máu.`
  },
  {
    title: "Câu chuyện truyền cảm hứng",
    description:
      "Lắng nghe câu chuyện về một người mẹ sống sót nhờ máu của những người xa lạ.",
    content: `Một người mẹ trẻ đã vượt qua cơn nguy kịch sau sinh nhờ những đơn vị máu kịp thời từ người hiến máu. Câu chuyện là minh chứng cho sức mạnh của lòng nhân ái và sự sẻ chia trong cộng đồng.`
  },
  {
    title: "Hiểu đúng về các nhóm máu",
    description:
      "Những thông tin cơ bản nhưng quan trọng về nhóm máu và sự tương thích.",
    content: `Có 4 nhóm máu chính là A, B, AB, và O. Người nhóm máu O là người cho phổ quát, còn nhóm máu AB là người nhận phổ quát. Biết rõ nhóm máu của mình giúp bạn chủ động hơn trong các tình huống y tế.`
  },
];

const Blog = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
        Blog Chia Sẻ Kinh Nghiệm
      </Typography>

      <Box>
        {blogPosts.map((post, index) => (
          <Accordion key={index} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" fontWeight="bold">
                {post.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default Blog;
