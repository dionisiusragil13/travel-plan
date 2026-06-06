import { Suspense } from "react";
import TravelContent from "./travel-content";

export default function TravelPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TravelContent />
    </Suspense>
  );
}