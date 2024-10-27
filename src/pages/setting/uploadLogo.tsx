/* eslint-disable @typescript-eslint/no-explicit-any */
import { Application } from "@/api";
import {useEffect, useState} from "react";
import { Button } from "symphony-ui";
import {BeatLoader} from 'react-spinners';
import { useSelector } from "react-redux";

export const UploadLogo = () => {
  const theme = useSelector((state: any) => state.theme.value.name);

  const [clinicName, setClinicName] = useState("");
  const [clinicName2, setClinicName2] = useState("");
  const [logoBase64, setLogoBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [buttonState, setButtonState] = useState("initial");
  const [logo,setLogo] = useState("");
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setLoading(true);
      setProgress(0);
      setError("");

      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target?.result;
        if (result && typeof result === "string") {
          // Delay setting the result until progress is complete
          const simulateProgress = setInterval(() => {
            setProgress((prev) => {
              const nextProgress = prev + 5;
              if (nextProgress >= 100) {
                clearInterval(simulateProgress);
                setLogoBase64(result);
                setLoading(false);
              }
              return nextProgress;
            });
          }, 100); // Update every 100ms
        }
      };

      reader.onerror = () => {
        setError(
          "The file could not be uploaded. Possible issues include invalid format, file size too large, or a corrupted file. Please check and try again."
        );
        setLoading(false);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleDeleteFile = () => {
    setFileName("");
    setLogoBase64("");
    setError("");
    setLoading(false)
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleClick = async () => {
    
  
    try {
      await handleSaveChanges();

      
  
    } catch (error) {
      console.error("Error during save:", error);
      setButtonState("initial");
    }
  };
  useEffect(() => {
    if(buttonState == 'finish'){
      setTimeout(() => {
        setButtonState("initial")
      }, 2000);
    }
  })
  const [visivleDelete,setVisibleDelete] = useState(false)
  const handleSaveChanges = async () => {
    if (!logoBase64 && clinicName == '') {
      console.error("No logo to save");
      return;
    }
    setButtonState("loading");
    try {
      const response = await Application.saveLogo({
          new_logo: logoBase64,
          clinic_name:clinicName
      });
      setLogo(logoBase64)
      setButtonState("finish");
      setClinicName2(clinicName)
      console.log("Response from server:", response);
      console.log("Clinic Name:", clinicName);
      console.log("Logo Base64:", logoBase64);

    } catch (error) {
      console.error("Error saving logo:", error);
    }
  };
  const [isLoading,setIsLoading] = useState(false)
  const getClinicLogo = async () => {
    setIsLoading(true)
   const data= await Application.getLogoClinic()
   if(data.data!='Internal Server Error'){
     setLogo(data.data.clinic_logo)
     setIsLoading(false)
     setClinicName2(data.data.clinic_name)
   }
  }
  useEffect(()=>{
    getClinicLogo()
  },[])
  return (
      <div className="  w-full flex h-[535px] items-start justify-center pt-10 px-6  dark:bg-black-primary border dark:border-none rounded-md">
       {isLoading ?
       <div className="w-full h-[350px] flex justify-center items-center">
          <BeatLoader size={10} color="#0CBC84"></BeatLoader>
       </div>
       :
       <>
          <div className={"flex-1 p-10 flex items-center justify-start  flex-col gap-3.5"}>
            <div>
              <h1 className={"mb-5 block  dark:text-gray-300 text-light-primary-text text-xs"}>Current Logo</h1>
              <div
              onMouseEnter={() => {
                setVisibleDelete(true)
              }}
              onMouseLeave={() => {
                setVisibleDelete(false)
              }}
                  className="border relative dark:border-main-border w-fit py-5 px-2  rounded-lg text-center text-primary-text flex flex-col items-center gap-5">
                <img className={"w-[170px] h-[150px]"} src={logo.length>=1?logo:"/Themes/Aurora/icons/EmptyStateLogo.svg"}/>
                {visivleDelete &&logo.length>0 &&
                  <img onClick={() => {
                    Application.saveLogo({
                          new_logo: '',
                          clinic_name:clinicName
                      });        
                      setLogo("")      
                  }} className="absolute cursor-pointer right-2 top-2" src="./Themes/Aurora/icons/trash.svg" alt="" />
                }
              </div>
            </div>
            {logo.length ==0 ?
            <h1 className={"block  text-light-primary-text dark:text-primary-text text-xs"}>No logo uploaded yet.</h1>
            :
            <h1 className={"block  text-light-primary-text dark:text-primary-text text-xs"}>{clinicName2}</h1>
            }
          </div>
          <div className="  flex flex-col items-center justify-start py-10 pr-10 w-[800px] md:min-w-4xl">
            <div className="mb-6 w-full ">
            <div className="text-primary-text text-sm font-medium mb-6">Upload Your Logo</div>

              <label className="block dark:text-primary-text text-light-primary-text text-xs font-normal mb-2">
            Clinic Name
          </label>
          <input
            type="text"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
            placeholder="Enter clinic name..."
            className=" outline-none w-full h-[32px] p-3 rounded-lg text-light-secandary-text dark:text-white dark:bg-black-primary bg-light-input-color border dark:border-main-border text-xs "
          />
        </div>

        <div className=" w-full  mb-8">
          <label className="block text-light-primary-text dark:text-primary-text text-xs mb-2">Clinic Logo</label>
          <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border  dark:border-main-border rounded-lg py-4 text-center text-light-primary-text darktext-primary-text flex flex-col items-center gap-5"
          >
            <img src="./Themes/Aurora/icons/uploadlogo.svg" alt=""/>
            <label htmlFor="fileUpload" className="cursor-pointer text-xs text-primary-text">
              Drag and drop a file here or{" "}
              <span className="text-brand-primary-color">upload a file</span>
              <div className="text-xs text-light-secondary-text darktext-secondary-text mt-2">
                JPG, PNG, SVG, PDF
              </div>
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileUpload"
            />

          </div>
        </div>

        {loading && (
            <div
                className="w-full  mb-4 flex items-center justify-between dark:bg-black-secondary border dark:border-main-border px-4 py-2 rounded-md">
              <span className="text-light-secandary-text dark:text-primary-text text-xs mr-3">{fileName}</span>
              <div className="flex items-center justify-between gap-2 w-full">
              <div className="relative w-full h-2 bg-gray-300 dark:bg-main-border rounded">
                <div
                  className="absolute top-0 left-0 h-2 bg-brand-secondary-color rounded"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-1">
                {" "}
                <span className="text-primary-text text-[10px]">
                  {Math.round(progress)}%
                </span>
                <button
                  onClick={handleDeleteFile}
                  className="text-brand-primary-color h-4 w-4 -mt-2"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="w-full max-w-xl mb-4 text-red-status bg-transparent px-4 py-2 rounded-lg flex items-center gap-1">
            <img src="./Themes/Aurora/icons/error.svg" alt="" />
            <span>{error}</span>
          </div>
        )}
        {!loading && logoBase64 && !error && fileName && (
          <div className="w-full  mb-4 flex items-center justify-between dark:bg-black-secondary border dark:border-main-border px-4 py-2 rounded-md">
            <div className="flex items-center gap-2">
              <img src="./Themes/Aurora/icons/XMLID_1737_.svg" alt="" />
              <span className=" text-light-secandary-text text-[14px]  dark:text-gray-200">{fileName}</span>
            </div>

            <img
              onClick={() => {
                handleDeleteFile();
              }}
              className="cursor-pointer"
              src="./Themes/Aurora/icons/trash.svg"
              alt=""
            />
          </div>
        )}

  <Button
    onClick={handleClick}
    theme={"Aurora"}
  >
    {buttonState === 'initial' && <div className="flex justify-center items-center gap-2 !">
      <img src={"/Themes/Aurora/icons/uploadIcon.svg"}/>
      <p>Save Changes</p>
    </div>}
    {buttonState === 'loading' && <BeatLoader size={10} color="white"/>}
    {buttonState === 'finish' && (
        <div className="flex justify-center items-center gap-1">
        <div className={`${theme}-icons-check`} />
        Saved Changes
      </div>
    )}
  </Button>
        </div>
       </>
       }
      </div>
  );
};
