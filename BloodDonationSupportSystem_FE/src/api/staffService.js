import axios from "../config/axios";


export const searchDonorsApi = (data) => axios.post("/staff/donors-search", data);

//   await axios.put(`/staff/update-process-is-passed/${id}`, data);
export const updateProcess = (data) => axios.put("/staff/update-process-is-passed/${id}", data);


/*
  const res = await axios.get("/staff/get-completed-donation-process-list/blood-checking");
      return res.data.data;
*/ 
export const bloodCheckProcessListApi=()=> axios.get("/staff/get-completed-donation-process-list/blood-checking");

//   await axios.put(`/staff/update-process-is-passed/${processId}`, data);
export const updateProcessIsPassedApi=(processId,data)=> axios.put(`/staff/update-process-is-passed/${processId}`, data);

// await axios.put(`/staff/update-blood-volume/${bloodTypeId}`,dataInventory);
export const updateBloodVolumeApi =(bloodTypeId,data)=>axios.put(`/staff/update-blood-volume/${bloodTypeId}`,data);