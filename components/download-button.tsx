"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DownloadButton({ tripData }: { tripData: any }) {
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/plan/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripData }), // Kirim hasil ke server
      });

      if (res.status == 401) {
        toast.info("silahkan login terlebih dahulu untuk mengunduh PDF");
        localStorage.setItem("pending_trip_data", JSON.stringify(tripData));
        router.push("/login?callback=/travel&action=download");
        return;
      }
      // Di dalam file DownloadButton kamu, ganti bagian pengecekan res.ok menjadi seperti ini:
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Server error dengan status: ${res.status}`,
        );
      }

      // Ubah stream response menjadi file blob untuk didownload otomatis
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `itinerary-travel.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      toast.success("PDF Berhasil diunduh!");
    } catch (err: any) {
      toast.error(err.message || "Gagal mengunduh PDF");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={downloading}
      className="flex items-center gap-2 mb-10"
    >
      <Download size={16} />
      {downloading ? "Downloading..." : "Unduh Rencana Perjalanan (PDF)"}
    </Button>
  );
}
