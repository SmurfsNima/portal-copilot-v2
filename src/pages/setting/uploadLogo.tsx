import  { useState } from 'react';

export const UploadLogo = () => {
  const [clinicName, setClinicName] = useState('');
  const [logoBase64, setLogoBase64] = useState('');

  const handleFileChange = (event : any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setLogoBase64(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Clinic Name:', clinicName);
    console.log('Logo Base64:', logoBase64);
  };

  return (
    <div className=" w-full flex flex-col items-center justify-start pt-10 px-6 min-h-screen bg-black-primary">
      
        <div className="mb-6 w-full max-w-xl">
          <label className="block text-primary-text text-xs mb-2">Clinic Name</label>
          <input
            type="text"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            placeholder="Enter clinic name..."
            className="w-full p-3 rounded-lg bg-black-primary border border-main-border rounded-lg text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="mb- w-full max-w-xl">
          <label className="block text-gray-300 mb-2">Clinic Logo</label>
          <div className="border border-dashed border-teal-500 rounded-lg p-6 text-center text-gray-400">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileUpload"
            />
            <label htmlFor="fileUpload" className="cursor-pointer">
              <div className="mb-2">
               
              </div>
              Drag and drop a file here or <span className="text-brand-primary-color">upload a file</span>
              <div className="text-sm mt-2">JPG, PNG, SVG, PDF</div>
            </label>
          </div>
        </div>

        <button
          onClick={handleSaveChanges}
          className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
        >
          Save Changes
        </button>
      
    </div>
  );
};

