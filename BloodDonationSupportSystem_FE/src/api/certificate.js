export const downloadCertificate = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8090/api/member/download/d593c8da-2d9f-43d1-bcab-37faae835262", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error:", errorText);
    throw new Error("Failed to download PDF");
  }

  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "certificate.pdf";
  a.click();
  URL.revokeObjectURL(url);
};