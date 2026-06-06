// components/travel/trip-plan-result.tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Wallet, Utensils, MapPin, Lightbulb, Users } from "lucide-react";

interface Activity {
  time: string;
  activity: string;
  location: string;
  estimatedCost: number;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: Activity[];
  recommendedFood: string[];
  dailyBudget: number;
}

interface TripData {
  summary: {
    destination: string;
    duration: number;
    budget: number;
    style: string;
    group: number;
  };
  budgetBreakdown: {
    accommodation: number;
    food: number;
    transportation: number;
    attractions: number;
    other: number;
  };
  itinerary: ItineraryDay[];
  tips: string[];
}

export default function TripPlanResult({ data }: { data: TripData }) {
  // State untuk memilih hari mana yang sedang aktif dilihat itinerary-nya
  const [activeDay, setActiveDay] = useState<number>(1);

  if (!data || !data.summary) {
    return <p className="text-center text-muted-foreground">Data rencana tidak valid.</p>;
  }

  // Helper untuk format Rupiah
  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const currentDayPlan = data.itinerary?.find((item) => item.day === activeDay);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Banner */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center shadow-md">
        <h2 className="text-3xl font-extrabold tracking-tight">
          ✨ Your Itinerary for {data.summary.destination}
        </h2>
        <p className="text-primary-foreground/80 mt-2 text-lg">
          A personalized {data.summary.duration}-day {data.summary.style.toLowerCase()} trip for {data.summary.group} person(s).
        </p>
      </div>

      {/* Ringkasan & Budget Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Stats */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Wallet className="size-5 text-primary" /> Info & Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-xs text-muted-foreground block font-medium">Alokasi Budget</span>
              <span className="text-2xl font-bold text-primary">{formatRupiah(data.summary.budget)}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm border-t pt-3">
              <div>
                <span className="text-muted-foreground block text-xs">Durasi</span>
                <span className="font-semibold flex items-center gap-1 mt-0.5">
                  <CalendarDays className="size-4 text-muted-foreground" /> {data.summary.duration} Hari
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs">Jumlah Orang</span>
                <span className="font-semibold flex items-center gap-1 mt-0.5">
                  <Users className="size-4 text-muted-foreground" /> {data.summary.group} Orang
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Breakdown Rincian Biaya */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Estimasi Distribusi Biaya</CardTitle>
            <CardDescription>Rekomendasi pembagian dana agar pengeluaran terkontrol</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-3 bg-secondary/50 rounded-lg">
              <span className="text-xs text-muted-foreground block">Penginapan</span>
              <span className="font-semibold text-sm">{formatRupiah(data.budgetBreakdown.accommodation)}</span>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <span className="text-xs text-muted-foreground block">Makanan</span>
              <span className="font-semibold text-sm">{formatRupiah(data.budgetBreakdown.food)}</span>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <span className="text-xs text-muted-foreground block">Transportasi</span>
              <span className="font-semibold text-sm">{formatRupiah(data.budgetBreakdown.transportation)}</span>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg">
              <span className="text-xs text-muted-foreground block">Destinasi / Tiket</span>
              <span className="font-semibold text-sm">{formatRupiah(data.budgetBreakdown.attractions)}</span>
            </div>
            <div className="p-3 bg-secondary/50 rounded-lg col-span-2 sm:col-span-1">
              <span className="text-xs text-muted-foreground block">Lain-lain</span>
              <span className="font-semibold text-sm">{formatRupiah(data.budgetBreakdown.other)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bagian Utama: Rencana Perjalanan Harian */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
          📅 Rencana Perjalanan Harian
        </h3>
        
        {/* Selector Hari */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {data.itinerary?.map((dayPlan) => (
            <button
              key={dayPlan.day}
              onClick={() => setActiveDay(dayPlan.day)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all whitespace-nowrap ${
                activeDay === dayPlan.day
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-background hover:bg-secondary/50 text-muted-foreground"
              }`}
            >
              Hari {dayPlan.day}
            </button>
          ))}
        </div>

        {/* Detail Hari yang Dipilih */}
        {currentDayPlan && (
          <Card className="border-primary/10 shadow-sm animate-in fade-in duration-300">
            <CardHeader className="bg-secondary/20 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl">Hari {currentDayPlan.day}: {currentDayPlan.title}</CardTitle>
                <CardDescription>Rangkaian aktivitas dan estimasi pengeluaran harian</CardDescription>
              </div>
              <Badge variant="outline" className="text-sm px-3 py-1 bg-background font-semibold h-fit self-start sm:self-center">
                Budget Hari Ini: {formatRupiah(currentDayPlan.dailyBudget)}
              </Badge>
            </CardHeader>
            
            <CardContent className="pt-6 space-y-6">
              {/* Timeline Aktivitas */}
              <div className="relative border-l-2 border-muted pl-5 ml-3 space-y-6">
                {currentDayPlan.activities?.map((act, index) => (
                  <div key={index} className="relative group">
                    {/* Penanda Waktu */}
                    <div className="absolute -left-7.75 top-0.5 bg-primary border-4 border-background w-5 h-5 rounded-full shadow-sm group-hover:scale-110 transition-transform" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 bg-secondary/30 p-4 rounded-xl border border-transparent hover:border-muted transition-all">
                      <div className="space-y-1">
                        <span className="inline-block text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {act.time}
                        </span>
                        <h4 className="font-bold text-base text-foreground mt-1">{act.activity}</h4>
                        <p className="text-muted-foreground text-xs flex items-center gap-1">
                          <MapPin className="size-3 shrink-0" /> {act.location}
                        </p>
                      </div>
                      <div className="text-right self-start sm:self-center">
                        <span className="text-xs text-muted-foreground block">Estimasi Biaya</span>
                        <span className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                          {act.estimatedCost === 0 ? "Gratis" : formatRupiah(act.estimatedCost)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rekomendasi Makanan Kuliner */}
              {currentDayPlan.recommendedFood && currentDayPlan.recommendedFood.length > 0 && (
                <div className="pt-4 border-t space-y-2">
                  <h5 className="text-sm font-bold flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <Utensils className="size-4" /> Rekomendasi Kuliner Hari Ini:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {currentDayPlan.recommendedFood.map((food, fIdx) => (
                      <Badge key={fIdx} variant="secondary" className="px-3 py-1 font-medium text-xs">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bagian Tips */}
      {data.tips && data.tips.length > 0 && (
        <Card className="border-amber-500/20 bg-amber-500/2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Lightbulb className="size-5" /> Tips Penting dari Travel Planner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-1">
              {data.tips.map((tip, index) => (
                <li key={index} className="leading-relaxed">
                  <span className="text-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}