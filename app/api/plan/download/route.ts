import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import PDFDocument from "pdfkit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // =========================
    // AMBIL COOKIE DARI HEADER (AMAN 100%)
    // =========================
    const cookieHeader = req.headers.get("cookie") || "";

    const token = cookieHeader
      .split(";")
      .find((c) => c.trim().startsWith("session_token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json(
        { message: "Sesi Anda telah berakhir, silakan login ulang." },
        { status: 401 },
      );
    }

    // =========================
    // VERIFY JWT
    // =========================
    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch {
      return NextResponse.json(
        { message: "Token tidak valid." },
        { status: 401 },
      );
    }

    // =========================
    // BODY
    // =========================
    const { tripData } = await req.json();

    // =========================
    // PDF GENERATION
    // =========================
    const pdfBuffer = await new Promise<Buffer>((resolve, reject) => {
      const doc = new PDFDocument({
        size: "A4",
        margin: 50,
        font: "Times-Roman",
      });
      const chunks: Buffer[] = [];

      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", reject);

      const PAGE_WIDTH = doc.page.width;
      const MARGIN = 50;
      const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

      // ─── COLOR PALETTE ───────────────────────────────────────────
      const COLOR_PRIMARY = "#1a1a2e"; // deep navy
      const COLOR_ACCENT = "#c9a84c"; // gold
      const COLOR_MUTED = "#666666";
      const COLOR_LIGHT_BG = "#f5f0e8"; // warm parchment
      const COLOR_WHITE = "#ffffff";
      const COLOR_DIVIDER = "#e0d6c2";

      // ─── HELPER: format currency (IDR) ───────────────────────────
      const formatIDR = (amount: number) =>
        `Rp ${amount.toLocaleString("id-ID")}`;

      // ─── HELPER: draw horizontal rule ────────────────────────────
      const drawRule = (y: number, color = COLOR_DIVIDER) => {
        doc
          .moveTo(MARGIN, y)
          .lineTo(PAGE_WIDTH - MARGIN, y)
          .strokeColor(color)
          .lineWidth(0.5)
          .stroke();
      };

      // ─── HELPER: section header ───────────────────────────────────
      const sectionHeader = (title: string) => {
        doc.moveDown(0.5);
        const y = doc.y;
        doc.rect(MARGIN, y, CONTENT_WIDTH, 24).fill(COLOR_PRIMARY);
        doc
          .fillColor(COLOR_WHITE)
          .font("Times-Bold")
          .fontSize(11)
          .text(title.toUpperCase(), MARGIN + 10, y + 6, {
            width: CONTENT_WIDTH - 10,
          });
        doc.moveDown(1);
        doc.fillColor(COLOR_PRIMARY).font("Times-Roman");
      };

      // ════════════════════════════════════════════════════════════
      // HEADER BANNER
      // ════════════════════════════════════════════════════════════
      doc.rect(0, 0, PAGE_WIDTH, 110).fill(COLOR_PRIMARY);

      // Gold accent bar
      doc.rect(0, 110, PAGE_WIDTH, 4).fill(COLOR_ACCENT);

      doc
        .fillColor(COLOR_ACCENT)
        .font("Times-Bold")
        .fontSize(26)
        .text("✈ TRAVEL ITINERARY", MARGIN, 28, {
          align: "center",
          width: CONTENT_WIDTH,
        });

      doc
        .fillColor(COLOR_WHITE)
        .font("Times-Roman")
        .fontSize(11)
        .text(`${tripData.summary.destination}`, MARGIN, 68, {
          align: "center",
          width: CONTENT_WIDTH,
        });

      doc.moveDown(1.5);

      // ════════════════════════════════════════════════════════════
      // TRIP SUMMARY CARDS (2-column grid)
      // ════════════════════════════════════════════════════════════
      const cardY = doc.y;
      const cardW = (CONTENT_WIDTH - 10) / 2;
      const cardH = 80;

      const summaryCards = [
        { label: "Destination", value: tripData.summary.destination },
        { label: "Duration", value: `${tripData.summary.duration} Days` },
        { label: "Travel Style", value: tripData.summary.style },
        { label: "Group Size", value: `${tripData.summary.group} People` },
      ];

      summaryCards.forEach((card, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const cx = MARGIN + col * (cardW + 10);
        const cy = cardY + row * (cardH + 8);

        doc.rect(cx, cy, cardW, cardH).fill(COLOR_LIGHT_BG);
        doc.rect(cx, cy, 4, cardH).fill(COLOR_ACCENT); // left accent bar

        doc
          .fillColor(COLOR_MUTED)
          .font("Times-Roman")
          .fontSize(8)
          .text(card.label.toUpperCase(), cx + 12, cy + 12, {
            width: cardW - 16,
          });
        doc
          .fillColor(COLOR_PRIMARY)
          .font("Times-Bold")
          .fontSize(13)
          .text(card.value, cx + 12, cy + 26, { width: cardW - 16 });
      });

      doc.y = cardY + Math.ceil(summaryCards.length / 2) * (cardH + 8) + 8;

      // ════════════════════════════════════════════════════════════
      // TOTAL BUDGET BANNER
      // ════════════════════════════════════════════════════════════
      doc.moveDown(0.5);
      const budgetBannerY = doc.y;
      doc.rect(MARGIN, budgetBannerY, CONTENT_WIDTH, 36).fill(COLOR_ACCENT);
      doc
        .fillColor(COLOR_PRIMARY)
        .font("Times-Bold")
        .fontSize(13)
        .text(
          `TOTAL BUDGET: ${formatIDR(tripData.summary.budget)}`,
          MARGIN,
          budgetBannerY + 10,
          { align: "center", width: CONTENT_WIDTH },
        );
      doc.moveDown(2.2);

      // ════════════════════════════════════════════════════════════
      // BUDGET BREAKDOWN
      // ════════════════════════════════════════════════════════════
      sectionHeader("Budget Breakdown");

      const budgetItems = Object.entries(tripData.budgetBreakdown) as [
        string,
        number,
      ][];
      const colW = CONTENT_WIDTH / budgetItems.length;

      const bbY = doc.y;
      budgetItems.forEach(([key, val], i) => {
        const bx = MARGIN + i * colW;
        const pct = Math.round((val / tripData.summary.budget) * 100);

        doc
          .rect(bx + 2, bbY, colW - 4, 60)
          .fill(i % 2 === 0 ? COLOR_LIGHT_BG : COLOR_WHITE);

        doc
          .fillColor(COLOR_MUTED)
          .font("Times-Roman")
          .fontSize(7.5)
          .text(key.charAt(0).toUpperCase() + key.slice(1), bx + 6, bbY + 6, {
            width: colW - 10,
          });

        doc
          .fillColor(COLOR_PRIMARY)
          .font("Times-Bold")
          .fontSize(9)
          .text(formatIDR(val), bx + 6, bbY + 20, { width: colW - 10 });

        // mini progress bar
        doc.rect(bx + 6, bbY + 42, colW - 16, 5).fill(COLOR_DIVIDER);
        doc
          .rect(bx + 6, bbY + 42, ((colW - 16) * pct) / 100, 5)
          .fill(COLOR_ACCENT);

        doc
          .fillColor(COLOR_MUTED)
          .font("Times-Roman")
          .fontSize(7)
          .text(`${pct}%`, bx + 6, bbY + 50, { width: colW - 10 });
      });

      doc.y = bbY + 70;

      // ════════════════════════════════════════════════════════════
      // DAILY ITINERARY
      // ════════════════════════════════════════════════════════════
      sectionHeader("Daily Itinerary");

      tripData.itinerary.forEach((day: any) => {
        // Day header
        doc.moveDown(0.3);
        const dayHeaderY = doc.y;
        doc.rect(MARGIN, dayHeaderY, CONTENT_WIDTH, 28).fill("#2d3561");
        doc
          .fillColor(COLOR_ACCENT)
          .font("Times-Bold")
          .fontSize(10)
          .text(`DAY ${day.day}`, MARGIN + 10, dayHeaderY + 7, {
            continued: true,
          });
        doc
          .fillColor(COLOR_WHITE)
          .font("Times-Roman")
          .fontSize(10)
          .text(`  —  ${day.title}`, { continued: false });

        doc.moveDown(0.8);

        // Activities
        day.activities.forEach((act: any, idx: number) => {
          const actY = doc.y;
          const isEven = idx % 2 === 0;

          doc
            .rect(MARGIN, actY, CONTENT_WIDTH, 52)
            .fill(isEven ? COLOR_LIGHT_BG : COLOR_WHITE);

          // Time badge
          doc.rect(MARGIN, actY, 52, 52).fill(COLOR_PRIMARY);
          doc
            .fillColor(COLOR_ACCENT)
            .font("Times-Bold")
            .fontSize(10)
            .text(act.time, MARGIN + 4, actY + 18, {
              width: 44,
              align: "center",
            });

          // Activity details
          doc
            .fillColor(COLOR_PRIMARY)
            .font("Times-Bold")
            .fontSize(10)
            .text(act.activity, MARGIN + 60, actY + 6, {
              width: CONTENT_WIDTH - 140,
            });

          doc
            .fillColor(COLOR_MUTED)
            .font("Times-Roman")
            .fontSize(8.5)
            .text(`📍 ${act.location}`, MARGIN + 60, actY + 22, {
              width: CONTENT_WIDTH - 140,
            });

          // Cost badge (right-aligned)
          if (act.estimatedCost > 0) {
            doc
              .fillColor(COLOR_ACCENT)
              .font("Times-Bold")
              .fontSize(8)
              .text(
                formatIDR(act.estimatedCost),
                PAGE_WIDTH - MARGIN - 90,
                actY + 20,
                {
                  width: 88,
                  align: "right",
                },
              );
          } else {
            doc
              .fillColor("#4caf50")
              .font("Times-Bold")
              .fontSize(8)
              .text("FREE", PAGE_WIDTH - MARGIN - 90, actY + 20, {
                width: 88,
                align: "right",
              });
          }

          doc.y = actY + 56;
        });

        // Recommended Food
        doc.moveDown(0.4);
        doc
          .fillColor(COLOR_MUTED)
          .font("Times-Bold")
          .fontSize(8.5)
          .text("🍽  RECOMMENDED:", MARGIN, doc.y);

        doc
          .fillColor(COLOR_PRIMARY)
          .font("Times-Roman")
          .fontSize(9)
          .text(day.recommendedFood.join("  •  "), MARGIN + 90, doc.y - 10, {
            width: CONTENT_WIDTH - 90,
          });

        // Daily budget line
        doc.moveDown(0.3);
        drawRule(doc.y);
        doc.moveDown(0.3);
        doc
          .fillColor(COLOR_PRIMARY)
          .font("Times-Bold")
          .fontSize(9)
          .text(`Daily Budget: ${formatIDR(day.dailyBudget)}`, MARGIN, doc.y, {
            align: "right",
            width: CONTENT_WIDTH,
          });
        doc.moveDown(0.8);
      });

      // ════════════════════════════════════════════════════════════
      // TRAVEL TIPS
      // ════════════════════════════════════════════════════════════
      sectionHeader("Travel Tips");

      tripData.tips.forEach((tip: string, i: number) => {
        const tipY = doc.y;
        // Number circle
        doc.circle(MARGIN + 8, tipY + 8, 8).fill(COLOR_ACCENT);
        doc
          .fillColor(COLOR_PRIMARY)
          .font("Times-Bold")
          .fontSize(8)
          .text(`${i + 1}`, MARGIN + 5, tipY + 3);

        doc
          .fillColor(COLOR_PRIMARY)
          .font("Times-Roman")
          .fontSize(9.5)
          .text(tip, MARGIN + 22, tipY, { width: CONTENT_WIDTH - 22 });

        doc.moveDown(0.5);
      });

      // ════════════════════════════════════════════════════════════
      // FOOTER
      // ════════════════════════════════════════════════════════════
      const footerY = doc.page.height - 40;
      doc.rect(0, footerY - 8, PAGE_WIDTH, 48).fill(COLOR_PRIMARY);
      doc
        .fillColor(COLOR_MUTED)
        .font("Times-Roman")
        .fontSize(8)
        .text(
          `Generated on ${new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}  •  ${decoded.email}`,
          MARGIN,
          footerY,
          { align: "center", width: CONTENT_WIDTH },
        );

      doc.end();
    });

    return new NextResponse(Buffer.from(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="itinerary.pdf"`,
      },
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { message: error.message || "Error generating PDF" },
      { status: 500 },
    );
  }
}
