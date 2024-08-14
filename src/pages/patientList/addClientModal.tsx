import  React, { useState, useEffect, useRef } from 'react';
interface AddClientModalProps{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { fullName: string; email: string; wearableDevice: string }) => void;
}
const AddClientModal : React.FC<AddClientModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [wearableDevice, setWearableDevice] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  const handleSubmit = (e : any) => {
    e.preventDefault();
    onSubmit({ fullName, email, wearableDevice });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black-background bg-opacity-50">
      <div ref={modalRef} className="bg-black-secondary text-primary-text p-6 rounded-lg shadow-lg w-full max-w-md">
        <button className=" absolute top-2 right-2" onClick={onClose}>
          &times;
        </button>
        <div className=" mb-6 w-full flex justify-between items-center">
          {" "}
          <h2 className="text-2xl font-bold  ">Add Client</h2>
          <button onClick={onClose} className="text-lg">X</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block  mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full p-2  bg-black-background text-secondary-text outline-none rounded-md"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your first and last name..."
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block  mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2  bg-black-background text-secondary-text outline-none rounded-md"              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="wearableDevice"
              className="block  mb-2"
            >
              Wearable Devices
            </label>
            <select
              id="wearableDevice"
              className="w-full p-2  bg-black-background text-secondary-text outline-none rounded-md"              value={wearableDevice}
              onChange={(e) => setWearableDevice(e.target.value)}
              required
            >
              <option value="" disabled>
                Select your wearable devices
              </option>
              <option value="device1">Device 1</option>
              <option value="device2">Device 2</option>
              <option value="device3">Device 3</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-brand-primary-color text-black p-2 rounded hover:bg-teal-500"
          >
           Add Client & Send Invitation
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
