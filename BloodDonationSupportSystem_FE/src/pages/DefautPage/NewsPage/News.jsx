
import { Box, Container, Typography, Card, CardMedia,CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const newsList = [
	{
		id: 1,
		img: "https://giotmauvang.org.vn/assets/images/271b5fe5f864d480023593de2e8aaf3a.png",
		caption: "Các đồng chí lãnh đạo và các đại biểu thực hiện nghi thức phát động Tháng Nhân đạo cấp quốc gia năm 2025",
		title: "KHỞI ĐỘNG THÁNG NHÂN ĐẠO NĂM 2025: HÀNH TRÌNH NHÂN ĐẠO - LAN TỎA YÊU THƯƠNG",
		desc: 'Ngày 8-5, tại TPHCM, Trung ương Hội Chữ thập đỏ Việt Nam và UBND TPHCM phối hợp tổ chức lễ phát động Tháng Nhân đạo cấp quốc gia năm 2025 với chủ đề "Hành trình nhân đạo - Lan tỏa yêu thương".',
		link: "/news/1",
	},
	{
		id: 2,
		img: "https://file.hstatic.net/1000115152/article/untitled_20a7b5fd50384d83bc4f8928efc9a7af_large.png",
		caption: "",
		title: "NGÀY TOÀN DÂN HIẾN MÁU TÌNH NGUYỆN 7/4/2025",
		desc: "Ngày 7/4, chúng ta cùng nhau hướng về một ngày ý nghĩa – Ngày Toàn dân hiến máu tình nguyện.",
		link: "/news/2",
	},
	{
		id: 3,
		img: "https://giotmauvang.org.vn/assets/images/da5501e9bb4fde7f2a6c831c04eae5e7.jpg",
		caption: "",
		title: "ÁP DỤNG CÔNG NGHỆ SỐ TRONG HOẠT ĐỘNG HIẾN MÁU TÌNH NGUYỆN",
		desc: "Ngày 04/3, tại Trung tâm Hiến máu nhân đạo, Hội Chữ thập đỏ Thành phố phối hợp Hội Tin học Thành phố cùng với sự đồng hành của c...",
		link: "/news/3",
	},
];


export default function News() {
	return (
		<Container maxWidth="xl" sx={{margin :"auto", marginTop: "80px"} }>
			{/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
				<Typography variant="h3">{message}</Typography>
			</Box> */}
			<Box  >
				<Box
							
					sx={{
						display : 'flex', flexWrap : 'wrap', justifyContent: "center",gap: 3,
						
					}}
				>
					{newsList.map((news) => (
						<Box
							item
							key={news.id}
							sx={{
								flex: "0 0 340px", 
								maxWidth: 340,
								minWidth: 340,
								display: "flex",
							}}
						>
							<Link to={news.link} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
								<Card
									sx={{
										marginBottom : 2,
										marginTop: 2,
										width: 1,
										height: 340, 
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										borderRadius: 3,
										boxShadow: 3,
										transition: "box-shadow 0.2s",
										"&:hover": { boxShadow: 8 },
									}}
								>
									<CardMedia
										component="img"
										image={news.img}
										alt="News Thumbnail"
										sx={{
											width: "100%",
											height: 160,
											objectFit: "cover",
											borderTopLeftRadius: 12,
											borderTopRightRadius: 12,
										}}
									/>
									<CardContent sx={{ flex: 1, width: "100%", p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
										<Typography
											variant="h6"
											component="h2"
											sx={{
												textAlign: "center",
												fontWeight: 700,
												fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.25rem" },
												mb: 1,
												display: "-webkit-box",
												WebkitLineClamp: 2,
												WebkitBoxOrient: "vertical",
												overflow: "hidden",
												minHeight: 56,
											}}
										>
											{news.title}
										</Typography>
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{
												textAlign: "center",
												fontSize: { xs: "1.15rem", sm: "1.2rem", md: "1.25rem" },
												display: "-webkit-box",
												WebkitLineClamp: 3,
												WebkitBoxOrient: "vertical",
												overflow: "hidden",
												minHeight: 60,
											}}
										>
											{news.desc}
										</Typography>
									</CardContent>
								</Card>
							</Link>
						</Box>
					))}
				</Box>
			</Box>
		</Container>
	);
}