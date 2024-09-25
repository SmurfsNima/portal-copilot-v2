import { useContext, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { AppContext } from '@/store/app';

const PdfViewerComponent = () => {
  const { pdfBase64String } = useContext(AppContext); // Access the base64 string

  useEffect(() => {
    console.log('PDF Base64 String:', pdfBase64String);
  }, [pdfBase64String]);

  if (!pdfBase64String) {
    return (
      <div className='w-full h-[50vh] bg-red-400'>
        No PDF available to display.
      </div>
    );
  }

  const pdfDataUrl = `data:application/pdf;base64,${pdfBase64String}`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfDataUrl;
    link.download = 'downloaded_file.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=' relative w-full flex  flex-col'>
       <button
        onClick={handleDownload}
        className='mt-4 px-4  z-40 py-2 bg-blue-500 text-white rounded-lg cursor-pointer absolute right-[8%]'
      >
        Download PDF
      </button>
    <div className=' h-[90vh] '>
      <Worker workerUrl='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'>
        <Viewer fileUrl={pdfDataUrl} />
      </Worker>
     
    </div>
    </div>
  );
};

export default PdfViewerComponent;