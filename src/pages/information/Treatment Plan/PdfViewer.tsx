import  { useContext } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { AppContext } from '@/store/app';

const PdfViewerComponent = () => {
  const { pdfBase64String } = useContext(AppContext); // Access the Base64 string
  console.log(pdfBase64String);
  if (!pdfBase64String) {
    return <div className='w-full h-[50vh] bg-red-400'>No PDF available to display.</div>;
  }

  // Construct a data URL for the PDF
  const pdfDataUrl = `data:application/pdf;base64,${pdfBase64String}`;

  
  return (
    <div className='bg-white z-50 overflow-visible h-[100vh]'>
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
        <Viewer fileUrl={pdfDataUrl} />
      </Worker>
    </div>
  );
};

export default PdfViewerComponent;