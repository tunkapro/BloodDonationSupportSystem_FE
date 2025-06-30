    import { Button, Card, CardContent, Stack, Typography, Box } from "@mui/material"
    import { Heart, ClipboardCheck } from "lucide-react"

    export function Navigation() {


    const navItems = [
        {
        path: "/health-check",
        label: "Sàng lọc sức khỏe",
        icon: Heart,
        description: "Kiểm tra và đánh giá tình trạng sức khỏe người hiến máu",
        },
        {
        path: "/process",
        label: "Quản lý tiến trình",
        icon: ClipboardCheck,
        description: "Theo dõi và quản lý toàn bộ quy trình hiến máu",
        },
    ]

    return (
        <Box>
        <Card sx={{ p: 2}}>
        <CardContent >
            <Stack spacing={2} direction="row">
            {navItems.map((item) => {
                const Icon = item.icon
                // const isActive = pathname === item.path

                return (
                <Button
                    key={item.path}
                    // variant={isActive ? "contained" : "outlined"}
                    onClick={() => navigate(item.path)}
                    startIcon={<Icon size={24} />}
                    sx={{
                    width: 600,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    textAlign: "left",
                    flexDirection: "column",
                    gap: 0.5,
                    px: 2,
                    py: 1.5,
                    }}
                >
                    <Typography variant="subtitle1" fontWeight={600}>
                    {item.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {item.description}
                    </Typography>
                </Button>
                )   
            })}
            </Stack>
        </CardContent>
        </Card>
        </Box>
    )
    }
