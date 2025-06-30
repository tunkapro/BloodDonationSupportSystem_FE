import * as React from "react";
import { useState, useEffect } from "react";
import { bloodCheckProcessListApi,updateProcessIsPassedApi,updateBloodVolumeApi } from "../../../api/staffService";

import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";

export default function BloodDonationGrid() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const vietnameseText = {
    columnMenuSortAsc: "Sắp xếp tăng dần",
    columnMenuSortDesc: "Sắp xếp giảm dần",
    columnMenuFilter: "Lọc",
    columnMenuHideColumn: "Ẩn cột",
    columnMenuManageColumns: "Quản lý cột",
    noRowsLabel: "Không có dữ liệu",
    loadingOverlayLabel: "Đang tải...",
    toolbarColumns: "Cột",
    toolbarFilters: "Bộ lọc",
    toolbarExport: "Xuất",
  };

  // 1. API lấy danh sách hiến máu CHƯA KIỂM TRA
  const fetchData = async () => {
    try {
   
      const res = await bloodCheckProcessListApi();
      return res.data.data;
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu hiến máu:", err.message);
      return [];
    }
  };

  // 2. Load dữ liệu vào bảng
  const loadAndSetData = async () => {
    const data = await fetchData();
    setRows(data.map((row) => ({ ...row, processId: row.processId })));
  };

  useEffect(() => {
    loadAndSetData();
  }, []);

  // 3. các api Xử lý cập nhật
  const processRowUpdate = async (newRow) => {
    const { processId,donationRegisId,bloodTest, status, bloodTypeId, volumeMl } = newRow;
    const validBloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

   
    if (bloodTest === "ĐÃ ĐẠT" && !validBloodTypes.includes(bloodTypeId)) {
      throw new Error("Bạn phải chọn nhóm máu khi đã kiểm tra!");
    }
    if (bloodTest === "KHÔNG ĐẠT" && !validBloodTypes.includes(bloodTypeId)) {
      throw new Error("Bạn phải chọn nhóm máu khi đã kiểm tra dù không đạt!");
    }

    try {
      const data = {
        bloodTest,
        bloodTypeId
      };
  
      await updateProcessIsPassedApi(processId,data);
      
     
      if (newRow.bloodTest === "ĐÃ ĐẠT" && newRow.bloodTypeId) {
    
        const dataInventory = { donationRegisId,processId,volumeMl};
      
        await updateBloodVolumeApi(bloodTypeId,dataInventory);
        alert("Đã thêm vào kho máu!");
      } else if (newRow.bloodTest === "KHÔNG ĐẠT") {
        alert("Cập nhật trạng thái thành công");
      }
      await loadAndSetData();
      return { ...newRow };
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Lỗi khi cập nhật!");
      throw err;
    }
  };

  // 5. Lưu thay đổi
  const handleSaveClick = (id) => async () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View },
    }));
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleRowModesModelChange = (newModel) => {
    setRowModesModel(newModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const columns = [
    {
      field: "processId",
      headerName: "Mã hồ sơ xử lí",
      width: 200,
      filterable: false,
    },
    {
      field: "donationRegisId",
      headerName: "Mã đăng kí hiến máu",
      width: 200,
      filterable: false,
      renderCell: (params) => <span>{params.value || "-"}</span>,
    },
    {
      field: "volumeMl",
      headerName: "Dung tích (ml)",
      width: 150,
      filterable: false,
    },
    ,
    {
      field: "status",
      headerName: "Trạng thái hiến",
      width: 150,
      filterable: false,
    },
    {
      field: "bloodTest",
      headerName: "Kiểm tra",
      width: 150,
      editable: true,
      filterable: false,
      renderEditCell: (params) => {
        const { id, field, value, api } = params;

        const handleChange = (event) => {
          api.setEditCellValue({ id, field, value: event.target.value });
        };

        return (
          <Select
            key={id}
            value={value || ""}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ height: 50 }}
          >
            {["CHƯA KIỂM TRA", "ĐÃ ĐẠT", "KHÔNG ĐẠT"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },

    {
      field: "bloodTypeId",
      headerName: "Nhóm máu",
      width: 150,
      editable: true,
      filterable: false,      
      valueFormatter: (params) => {
        return params ?? "-";
      },
    
      renderEditCell: (params) => {
        const { id, field, value, api } = params;
    
        const handleChange = (event) => {
          const selectedValue = event.target.value;
          api.setEditCellValue({
            id,
            field,
            value: selectedValue === "null" ? null : selectedValue,
          });
        };
    
        return (
          <Select
            key={id}
            value={value ?? "null"}
            onChange={handleChange}
            fullWidth
            size="small"
            sx={{ height: 50 }}
          >
            <MenuItem value="null">-</MenuItem>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        );
      },
    }
    
    ,
    {
      field: "actions",
      type: "actions",
      headerName: "Thao tác",
      filterable: false,
      width: 130,
      getActions: ({ id }) => {
        const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit;
        return isEditing
          ? [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Lưu"
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Huỷ"
                onClick={handleCancelClick(id)}
              />,
            ]
          : [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Sửa"
                onClick={handleEditClick(id)}
              />,
            ];
      },
    },
  ];

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kho máu</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            onClick={() =>
              navigate("/staff/storage/blood-donation-list", {
                state: { shouldReload: true },
              })
            }
          >
            Danh sách kiểm tra máu
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.processId} 
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(err) => alert(err.message)}
          localeText={vietnameseText}
          disableColumnSelector
          pagination
              initialState={{
                pagination: { paginationModel: { page: 0, pageSize: 9 } },
              }}
        />
      </Box>
    </Box>
  );
}
