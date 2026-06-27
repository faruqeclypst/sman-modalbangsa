"use client";

import * as React from "react";
import Image from "next/image";
import { FileText, Download, ExternalLink, Info, Image as ImageIcon, Maximize2 } from "lucide-react";
import { ImageLightbox } from "@/components/ui/image-lightbox";

interface CalendarViewerProps {
  dict: any;
  lang: string;
}

export function CalendarViewer({ dict, lang }: CalendarViewerProps) {
  const [activeTab, setActiveTab] = React.useState<"image" | "pdf">("image");
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  const pdfUrl = "/docs/kaldik.pdf";
  const imageUrl = "/images/kaldik-1.png";
  const fileSize = "221 KB";

  const calendarTitle = dict.profile.calendar.title;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Tab Switcher & Quick Action Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white border border-gray-100 rounded-3xl p-4 shadow-lg shadow-gray-150/20">
        {/* Tabs */}
        <div className="flex p-1 bg-gray-100/75 rounded-2xl w-full md:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab("image")}
            className={`flex items-center justify-center gap-2 flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === "image"
                ? "bg-white text-emerald-700 shadow-md shadow-gray-200/50"
                : "text-gray-600 hover:text-gray-900"
              }`}
          >
            <ImageIcon className="size-4" />
            <span>{dict.profile.calendar.tabImage}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pdf")}
            className={`flex items-center justify-center gap-2 flex-1 md:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${activeTab === "pdf"
                ? "bg-white text-emerald-700 shadow-md shadow-gray-200/50"
                : "text-gray-600 hover:text-gray-900"
              }`}
          >
            <FileText className="size-4" />
            <span>{dict.profile.calendar.tabPdf}</span>
          </button>
        </div>

        {/* Global Toolbar Action Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href={pdfUrl}
            download="Kalender_Pendidikan_SMAN_Modal_Bangsa.pdf"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-2xl transition-all duration-250 shadow-md shadow-emerald-600/10 cursor-pointer w-full sm:w-auto"
          >
            <Download className="size-4" />
            <span>{dict.profile.calendar.download}</span>
          </a>
          <a
            href={activeTab === "image" ? imageUrl : pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 active:bg-gray-100 border border-gray-200 rounded-2xl transition-all duration-250 w-full sm:w-auto"
          >
            <ExternalLink className="size-4" />
            <span>{dict.profile.calendar.openNewTab}</span>
          </a>
        </div>
      </div>

      {/* Card Container for Content */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden">
        {/* Info Header inside Card */}
        <div className="bg-gray-50/75 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${activeTab === "image" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              }`}>
              {activeTab === "image" ? <ImageIcon className="size-5" /> : <FileText className="size-5" />}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 leading-tight">
                {activeTab === "image" ? "Kalender Pendidikan" : "kaldik.pdf"}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                {activeTab === "image" ? "High-res Image" : "PDF Document"} • {fileSize}
              </p>
            </div>
          </div>

          {activeTab === "image" && (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 rounded-lg transition-colors duration-200"
            >
              <Maximize2 className="size-3.5" />
              <span>{dict.profile.calendar.viewFullscreen}</span>
            </button>
          )}
        </div>

        {/* Content Area */}
        <div className="relative bg-gray-50 w-full min-h-[500px] flex items-center justify-center">

          {/* Active Tab: Image */}
          {activeTab === "image" && (
            <div
              onClick={() => setLightboxOpen(true)}
              className="group relative w-full p-4 sm:p-8 flex justify-center cursor-zoom-in transition-all duration-300 hover:bg-gray-100/50"
            >
              <div className="relative max-w-full max-h-[800px] shadow-lg rounded-xl overflow-hidden bg-white border border-gray-100">
                <img
                  src={imageUrl}
                  alt={calendarTitle}
                  className="max-w-full h-auto max-h-[750px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>
            </div>
          )}

          {/* Active Tab: PDF */}
          {activeTab === "pdf" && (
            <div className="relative w-full h-[600px] sm:h-[800px] md:h-[900px] flex items-center justify-center">
              {/* Fallback content for devices/browsers that don't render inline PDFs */}
              <div className="absolute inset-0 z-0 flex flex-col items-center justify-center text-center p-8 bg-gray-50">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-4">
                  <FileText className="size-10" />
                </div>
                <h4 className="text-lg font-bold text-gray-950 mb-2">
                  {calendarTitle}
                </h4>
                <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
                  {dict.profile.calendar.fallbackMessage}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={pdfUrl}
                    download="Kalender_Pendidikan_SMAN_Modal_Bangsa.pdf"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors duration-250 shadow-md shadow-emerald-600/10"
                  >
                    <Download className="size-4" />
                    <span>{dict.profile.calendar.download}</span>
                  </a>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 border border-gray-250 rounded-xl transition-colors duration-250"
                  >
                    <ExternalLink className="size-4" />
                    <span>{dict.profile.calendar.openNewTab}</span>
                  </a>
                </div>
              </div>

              {/* The actual iframe displaying the PDF */}
              <iframe
                src={`${pdfUrl}#toolbar=1`}
                className="relative z-10 w-full h-full border-0"
                title={calendarTitle}
              />
            </div>
          )}
        </div>
      </div>

      {/* Helper Tips */}
      <div className="flex gap-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 text-emerald-800">
        <Info className="size-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-sm leading-relaxed">
          <span className="font-bold">
            {lang === "id" ? "Petunjuk Penggunaan:" : "How to Use:"}
          </span>{" "}
          {lang === "id"
            ? "Pilih tab 'Gambar Kalender' untuk melihat pratinjau instan yang responsif dan dapat di-zoom (klik gambar untuk memperbesar layar penuh). Pilih tab 'Dokumen PDF' untuk menggunakan PDF Viewer interaktif bawaan browser."
            : "Select the 'Calendar Image' tab for a fast, responsive, and zoomable preview (click the image to enter fullscreen zoom). Select the 'PDF Document' tab to use the browser's built-in interactive PDF viewer."}
        </div>
      </div>

      {/* Lightbox Component */}
      {lightboxOpen && (
        <ImageLightbox
          images={[{ src: imageUrl, alt: calendarTitle }]}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
