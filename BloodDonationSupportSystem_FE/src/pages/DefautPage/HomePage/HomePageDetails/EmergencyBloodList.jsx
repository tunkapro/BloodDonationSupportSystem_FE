import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Grid,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import customAxios from "../../../../config/axios";
import { getEmergencyCases, respondEmergencyRequest } from "../../../../api/emergencyBloodRequest";


const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const ITEMS_PER_PAGE = 5;

export default function EmergencyRequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [page, setPage] = useState(0);

  useEffect(() => {
    getEmergencyCases()
      .then((res) => {
        setRequests(res.data.data);
        setLoading(false);
      });

    const socket = new SockJS(SOCKET_URL);
    const stomp = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stomp.subscribe("/emergency/emergency-requests", (msg) => {
          const data = JSON.parse(msg.body);
          setRequests((prev) => [data, ...prev]);
        });
        setLoading(false);
      },
    });

    stomp.activate();
    return () => stomp.deactivate();
  }, []);

  const respond = async (id) => {
    try {
      var result = await respondEmergencyRequest(id);
      if (result) {
        setSnackbar({
          open: true,
          message: "✅ Bạn đã phản hồi đơn khẩn cấp thành công!",
          severity: "success",
        });
      }
    } catch (err) {
      if (err.status === 403) {
        setSnackbar({
          open: true,
          message: "Bạn không thể sử dụng chức năng này!",
          severity: "error",
        });
      } else {
        let errorMessage = "";
        if (err.response.data.message === "Donor not found") {
          errorMessage = "Bạn chưa đăng kí!";
        } else if (
          err.response.data.message === "Cannot found emergency request"
        ) {
          errorMessage = "Không tìm thấy đơn yêu cầu khẩn cấp";
        } else if (
          err.response.data.message ===
          "You already have a pending registration!"
        ) {
          errorMessage = "Bạn đã có 1 đơn đăng kí chờ đợi!";
        } else if (
          err.response.data.message ===
          "You have donated within the last 90 days. Please wait longer!"
        ) {
          errorMessage = "Bạn đã hiến máu trong 90 ngày. Hãy đợi hồi phục!!!";
        } else if (err.response.data.message === "Your blood type mismatch in request") {
          errorMessage = "Nhóm máu của bạn không giống với yêu cầu!!!"
        }
        setSnackbar({
          open: true,
          message: errorMessage,
          severity: "error",
        });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const totalPages = Math.ceil(requests.length / ITEMS_PER_PAGE);
  const visibleRequests = requests.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Typography textAlign="center" variant="h5" gutterBottom>
        🩸 Các đơn hiến máu khẩn cấp mới nhất
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" my={5}>
          <CircularProgress />
        </Box>
      ) : requests.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography>Không có đơn khẩn cấp nào lúc này.</Typography>
        </Box>
      ) : (
        <Box>
          <Grid container spacing={2}>
            {visibleRequests.map((req) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={2.4}
                key={req.emergencyBloodRequestId}
              >
                <Paper
                  elevation={3}
                  sx={{
                    padding: 2,
                    height: "100%",
                    minHeight: 280,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h6">{req.patientName}</Typography>
                    <Typography>
                      👨‍👩‍👧 Người thân: {req.patientRelatives}
                    </Typography>
                    <Typography>🩸 Nhóm máu: {req.bloodType}</Typography>
                    <Typography>
                      📍 Địa điểm: {req.locationOfPatient}
                    </Typography>
                    <Typography>🔥 Mức độ: {req.levelOfUrgency}</Typography>
                    <Typography>🧪 Thể tích: {req.volumeMl} ml</Typography>

                    {req.note && (
                      <Typography>📝 Ghi chú: {req.note}</Typography>
                    )}
                  </Box>
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => respond(req.emergencyBloodRequestId)}
                    >
                      Tôi muốn hiến máu
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            <IconButton
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
            >
              <ArrowBackIos />
            </IconButton>
            <Typography sx={{ lineHeight: "40px" }}>
              Trang {page + 1} / {totalPages}
            </Typography>
            <IconButton
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={page >= totalPages - 1}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
