
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

import { Link } from "react-router-dom";

import { ManagementAPI } from "../../../api/ManagementAPI";
import { useEffect, useState } from "react";


export default function News() {
	const [newsList, setNewsList] = useState([])
	const [message, setMessage] = useState(null)
	useEffect(() => {
		const fetchData = async () => {
			const data = await ManagementAPI.getNews();
			console.log(data)
			if(data){
				setNewsList(data);
			}else{
				setMessage("Hiện Tại Chưa Có Tin Tức!")
			}
		}
		fetchData();20
	},[])

	return (
		<Container maxWidth="xl" sx={{margin : 10}}>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
				<Typography variant="h3">{message}</Typography>
			</Box>
			<Box>
				<Grid
					container
					spacing={5}
					justifyContent="center"
					alignItems="stretch"
					sx={{
						flexWrap: "nowrap", // Không xuống dòng, luôn nằm 1 hàng ngang
						overflowX: "auto",  // Cho phép cuộn ngang nếu nhỏ hơn màn hình
					}}
				>
					{newsList.map((news) => (
						<Grid
							item
							key={news.id}
							sx={{
								flex: "0 0 340px", // Card vuông, cố định chiều rộng
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
										height: 340, // Card vuông
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
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
}