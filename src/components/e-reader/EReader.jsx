import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

function EReader({ fileURL, onDocLoad }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    onDocLoad();
  }

  function handlePrevPage() {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  }
  function handleNextPage() {
    if (pageNum < numPages) {
      setPageNum(pageNum + 1);
    }
  }

  const buttonStyle = "bg-gray-300 text-white p-2 px-2 mx-2 rounded-md";
  return (
    <div className="flex flex-col items-center">
      <Document
        file={fileURL}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
        className="flex flex-col items-center"
      >
        <Page pageNumber={pageNum} />
        <div>
          <button className={buttonStyle} onClick={handlePrevPage}>
            Prev
          </button>
          <button className={buttonStyle} onClick={handleNextPage}>
            Next
          </button>
        </div>
      </Document>
    </div>
  );
}

export default EReader;
