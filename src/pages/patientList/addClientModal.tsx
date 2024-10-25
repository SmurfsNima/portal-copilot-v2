/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from '@/api';
import { publish } from '@/utils/event';
import  React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'symphony-ui';
interface AddClientModalProps{
    isOpen: boolean;
    onClose: () => void;
    sendCLientData : (clientData:any)=> void;
    onSubmit: (data: { fullName: string; email: string; wearableDevice: string }) => void;
}
const AddClientModal : React.FC<AddClientModalProps> = ({ isOpen, onClose, onSubmit , sendCLientData }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const theme = useSelector((state: any) => state.theme.value.name);
  const [wearableDevice,] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [step,setStep] = useState('AddCient')
  useEffect(()=>console.log(step) , [step]
  )
// const [memberID, setMemberID] = useState()
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
  useEffect(() => {
    if(!isOpen){
      setStep("AddCient")
    }
  },[isOpen])
  const [memberId,setMemberId] = useState("")
  // if (!isOpen) return setStep("AddCient")
  if (!isOpen) return null;
  // const clientData = { fullName, email, wearableDevice };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // onSubmit(clientData);

    // Send invitation email
    Application.addClient({
        first_name:firstName,
        email: email,
        last_name:lastName,
        picture:'',
        wearable_devices:[wearableDevice]
    }).then((res) => {
      if(res.data.member_id){
        setStep("success")
        sendCLientData({
          fullName: firstName + lastName,
          email: email,
          wearableDevice: wearableDevice,
          memberId:res.data.member_id
        })
        publish("reloadPage",{})
        setMemberId(res.data.member_id)
      }
    })
    // await sendInvitationEmail(clientData);
    // onClose();
  };

  
  // const sendClientData = async (clientData: { fullName: string; email: string; wearableDevice: string }) => {
  //   const dataToSend = {
  //     personal_info: {
  //       name: clientData.fullName,
  //       email: clientData.email,
  //       picture: "", // Assuming picture is optional or to be filled later
  //       wearable_devices: [clientData.wearableDevice] // Assuming this is an array
  //     }
  //   };
  //   try {
  //    const response = await  Application.addClient(dataToSend)
  //     console.log(response);
      
  //    if (response.status !== 200) {
  //     throw new Error('Error sending client data');
  //     }

  //     console.log('Client data sent successfully');
  //     setMemberID(response.data.member_id)
  //   } catch (error) {
  //     console.error('Failed to send client data:', error);
  //   }
  // };
  
  // const sendInvitationEmail = async (clientData: { fullName: string; email: string; wearableDevice: string }) => {
  //   console.log(email);
    
  //   try {
  //     const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${process.env.REACT_APP_SENDGRID_API_KEY}`,
  //       },
  //       body: JSON.stringify({
  //         personalizations: [
  //           {
  //             to: [{ email: clientData.email }],
  //             subject: 'Welcome to Our Service',
  //           },
  //         ],
  //         from: { email: 'your-email@example.com' },
  //         content: [
  //           {
  //             type: 'text/plain',
  //             value: `Hello ${clientData.fullName}, welcome to our service! Your device: ${clientData.wearableDevice}.`,
  //           },
  //         ],
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Error sending email');
  //     }

  //     console.log('Email sent successfully');
  //   } catch (error) {
  //     console.error('Failed to send email:', error);
  //   }
  // };
  
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-light-overlay dark:bg-black-background bg-opacity-80 dark:bg-opacity-95">
      <div ref={modalRef} className={`dark:bg-black-secondary bg-white relative text-primary-text p-6 rounded-lg shadow-lg ${step=='AddCient' ?'w-[428px]':'w-[570px]'} `}>

        {/* <button className=" absolute top-2 right-2" onClick={onClose}>
          &times;
        </button> */}
        {step == 'AddCient'? 
        <>
          <div className=" mb-6 w-full flex justify-between items-center">
            {" "}
            <h2 className="text-[14px] text-light-secandary-text dark:text-white font-medium ">Add Client</h2>
            <button onClick={onClose} className="text-lg">
              <img className='Aurora-icons-close' ></img>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-light-secandary-text dark:text-white text-[12px] mb-2">
                First Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full p-2 pl-4  text-[12px] bg-light-input-color text-light-secandary-text border border-light-border-color dark:bg-black-background placeholder:dark:text-secondary-text dark:border-none placeholder:text-light-primary-text dark:text-primary-text outline-none rounded-md"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                placeholder="Enter client first name..."
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-light-secandary-text dark:text-white text-[12px] mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full p-2 pl-4  text-[12px] bg-light-input-color text-light-secandary-text border border-light-border-color dark:bg-black-background placeholder:dark:text-secondary-text dark:border-none placeholder:text-light-primary-text dark:text-primary-text outline-none rounded-md"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter client last name...."
                required
              />
            </div>            
            <div className="mb-4">
              <label htmlFor="email" className="block text-light-secandary-text dark:text-white text-[12px] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 pl-4  text-[12px] bg-light-input-color text-light-secandary-text border border-light-border-color dark:bg-black-background placeholder:dark:text-secondary-text dark:border-none placeholder:text-light-primary-text dark:text-primary-text outline-none rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter client email address..."
                required
              />
            </div>
            {/* <div className="mb-4">
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
            </div> */}
            <div className='flex justify-center'>
            <Button
              type="submit"
              theme={theme}
              data-width="full"
              // className="w-full text-[14px] bg-brand-primary-color text-black p-2 rounded hover:bg-teal-500"
            >
              <div className='font-medium'>
                Add Client & Send Invitation

              </div>
            </Button>
            </div>
          </form>
        </>
        :
        <>
          <div className='absolute top-3 right-3'>
            <button onClick={onClose} className="text-lg">
             <img className='Aurora-icons-close' ></img>
            </button>        

          </div>
          <div className='w-full flex justify-center'>
            <img src="./images/tick-circle.png" alt="" />

          </div>
          <div className='text-[14px] text-light-secandary-text dark:text-white font-medium text-center mt-3'>An invitation has been sent to {email}</div>
          <div className='text-[12px] text-light-secandary-text dark:text-white font-medium text-center my-3'>Alex has no fitness content. Start setting up their account.</div>
          <div className='text-[12px] text-light-secandary-text dark:text-white  text-center ' style={{lineHeight:'24px'}}>To setup or review client’s progress, always open the client account to look into it. Build a new training program for them, or subscribe them one you have already built. You can also prescribe habits or a meal plan.</div>

          <div className='w-full flex gap-4 mt-4 justify-center items-center'>
            <Button onClick={() => {
                const clientData = { fullName:firstName, email, wearableDevice ,memberId};
                setEmail("")
                setfirstName("")
                setLastName("");
                onSubmit(clientData);
            }} theme="Aurora-secondary">
                <img className="Aurora-icons-EShare" alt="" />
                Open Client Account
              </Button>
            <Button onClick={async() => {
              setStep("AddCient")
              setEmail("")
              setfirstName("")
              setLastName("")
              // await sendCLientData(clientData)
           
        
            }} theme="Aurora">
              <img className='Aurora-icons-userAdd' alt="" />
              Add Another Client</Button>
          </div>
        </>}        
      </div>
    </div>
  );
};

export default AddClientModal;
