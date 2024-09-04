import  React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'symphony-ui';
interface AddClientModalProps{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { fullName: string; email: string; wearableDevice: string }) => void;
}
const AddClientModal : React.FC<AddClientModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const theme = useSelector((state: any) => state.theme.value.name);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientData = { fullName, email, wearableDevice };
    onSubmit(clientData);

    // Send invitation email
    await sendInvitationEmail(clientData);

    onClose();
  };
  
  const sendInvitationEmail = async (clientData: { fullName: string; email: string; wearableDevice: string }) => {
    console.log(email);
    
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: clientData.email }],
              subject: 'Welcome to Our Service',
            },
          ],
          from: { email: 'your-email@example.com' },
          content: [
            {
              type: 'text/plain',
              value: `Hello ${clientData.fullName}, welcome to our service! Your device: ${clientData.wearableDevice}.`,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error('Error sending email');
      }

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black-background bg-opacity-50">
      <div ref={modalRef} className="bg-black-secondary text-primary-text p-6 rounded-lg shadow-lg w-full max-w-md">
        <button className=" absolute top-2 right-2" onClick={onClose}>
          &times;
        </button>
        <div className=" mb-6 w-full flex justify-between items-center">
          {" "}
          <h2 className="text-[14px] font-medium ">Add Client</h2>
          <button onClick={onClose} className="text-lg">
            <img src={"Themes/Aurora/icons/close.svg"}></img>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-[12px] mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full p-2 pl-4  text-[12px] bg-black-background placeholder:text-secondary-text text-primary-text outline-none rounded-md"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your first and last name..."
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-[12px] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 pl-4 text-[12px]  bg-black-background placeholder:text-secondary-text text-primary-text outline-none rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="wearableDevice"
              className="block text-[12px] mb-2"
            >
              Wearable Devices
            </label>
            <select
              id="wearableDevice"
              className="w-full p-2 px-4 text-[12px] bg-black-background text-secondary-text outline-none rounded-md"
              value={wearableDevice}
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
          <div className='flex justify-center'>
          <Button
            type="submit"
            theme={theme}
            // className="w-full text-[14px] bg-brand-primary-color text-black p-2 rounded hover:bg-teal-500"
          >
           Add Client & Send Invitation
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;
