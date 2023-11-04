import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function EReader({ fileURL }) {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="flex justify-center">
      <Document file={fileURL}>
        <Page pageNumber={pageNumber} />
      </Document>
    </div>
  );
}

export default EReader;
