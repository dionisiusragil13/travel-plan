import { Plane } from "lucide-react";

export const Logo = () => (
  <div className="flex items-center gap-2.5 select-none">
    {/* Ikon Pesawat dari Lucide React pengganti SVG lama */}
    <Plane 
      size={24} 
      className="text-foreground transform -rotate-45" // -rotate-45 bikin pesawatnya mendongak ke kanan atas, terlihat lebih dinamis
    />

    {/* Teks Nama Brand Baru (Itinera) dengan Style Font Khas Shadcn */}
    <span className="font-bold text-xl tracking-tight text-foreground">
      Itinera<span className="text-muted-foreground font-medium">.ai</span>
    </span>
  </div>
);
