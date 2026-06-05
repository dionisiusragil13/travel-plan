"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Footer from "@/components/footer";
import StepperVerticalScrollTrackDemo from "@/components/shadcn-studio/stepper/stepper-12";
import TripPlanResult from "@/components/trip-plan-result"; // Sesuaikan path komponen result kamu
import DownloadButton from "@/components/download-button";

export default function Travel() {
  // State untuk menyimpan hasil plan perjalanan
  const [tripData, setTripData] = useState<any | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get("action");

  useEffect(() => {
    const savedData = localStorage.getItem("pending_trip_data");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setTripData(parsedData);
    }
    if (action === "download") {
      localStorage.removeItem("pending_trip_data");
      router.replace("/travel");
    }
  }, [action, router]);

  return (
    <>
      <div className="min-h-screen px-10 pt-10 flex flex-col items-center">
        <h1 className="font-bold text-4xl pb-10">Fill The Question</h1>

        {/* Berikan prop onSuccess ke stepper */}
        <StepperVerticalScrollTrackDemo
          onSuccess={(data) => setTripData(data)}
        />
        {tripData && (
          <div className="w-full max-w-4xl mt-16 border-t pt-10">
            <TripPlanResult data={tripData} />
            <DownloadButton tripData={tripData} />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
