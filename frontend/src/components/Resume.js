import React, { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

const Resume = ({ pdfBlob, isLoading }) => {
  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/worker/pdf.worker.min.mjs";

    const loadPdf = async () => {
      if (pdfBlob) {
        const pdfDoc = await pdfjsLib.getDocument(URL.createObjectURL(pdfBlob))
          .promise;
        setPdf(pdfDoc);
        setTotalPages(pdfDoc.numPages);
      }
    };

    loadPdf();
  }, [pdfBlob]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdf) return;
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const { width, height } = viewport;
      canvas.width = width;
      canvas.height = height;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
    };

    renderPage();
  }, [pdf, pageNum]);

  const handleNextPage = () => {
    if (pageNum < totalPages) {
      setPageNum(pageNum + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  return (
    <div className="resume-container">
      <div className="resume-preview relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 rounded-md">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin mb-2" />
            <p className="text-gray-600 text-sm">Loading...</p>
          </div>
        )}
        <canvas
          ref={canvasRef}
          style={{ visibility: isLoading ? "hidden" : "visible" }}
        ></canvas>
      </div>
      <div className="page-switcher">
        <div
          className="switch-left"
          onClick={handlePrevPage}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.32427537,7.23715414 L10.6757246,5.76284586 L16.6757246,11.2628459 C17.1080918,11.6591824 17.1080918,12.3408176 16.6757246,12.7371541 L10.6757246,18.2371541 L9.32427537,16.7628459 L14.5201072,12 L9.32427537,7.23715414 Z"
              fill={pageNum > 1 ? "white" : "#1e1e1e"}
              style={{ cursor: pageNum > 1 ? "pointer" : "default" }}
            />
          </svg>
        </div>

        <div className="page-indicator">
          {pageNum} / {totalPages === 0 || isLoading ? totalPages + 1 : totalPages}
        </div>

        <div
          className="switch-right"
          onClick={handleNextPage}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.32427537,7.23715414 L10.6757246,5.76284586 L16.6757246,11.2628459 C17.1080918,11.6591824 17.1080918,12.3408176 16.6757246,12.7371541 L10.6757246,18.2371541 L9.32427537,16.7628459 L14.5201072,12 L9.32427537,7.23715414 Z"
              fill={pageNum < totalPages ? "white" : "#1e1e1e"}
              style={{ cursor: pageNum < totalPages ? "pointer" : "default" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Resume;
