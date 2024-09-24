import  { useContext } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { AppContext } from '@/store/app';

const PdfViewerComponent = () => {
  const { pdfBlob } = useContext(AppContext); // Access the context

  if (!pdfBlob) {
    return <div>No PDF available to display.</div>;
  }

  return (
    <div className='bg-white z-50'>
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
        <Viewer fileUrl={URL.createObjectURL(pdfBlob)} />
      </Worker>
    </div>
  );
};

export default PdfViewerComponent;