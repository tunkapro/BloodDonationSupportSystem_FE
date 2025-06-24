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
  },
  {
    title: "Chế độ ăn trước và sau hiến máu",
    description:
      "Tìm hiểu các loại thực phẩm nên và không nên ăn trước/sau khi hiến máu.",
  },
  {
    title: "Vì sao nên hiến máu định kỳ?",
    description:
      "Hiến máu không chỉ cứu người mà còn mang lại lợi ích sức khỏe cho bản thân bạn.",
  },
  {
    title: "Câu chuyện truyền cảm hứng",
    description:
      "Lắng nghe câu chuyện về một người mẹ sống sót nhờ máu của những người xa lạ.",
  },
  {
    title: "Hiểu đúng về các nhóm máu",
    description:
      "Những thông tin cơ bản nhưng quan trọng về nhóm máu và sự tương thích.",
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
