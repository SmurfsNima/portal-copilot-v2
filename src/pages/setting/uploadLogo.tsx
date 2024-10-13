import { Application } from "@/api";
import { useState } from "react";
import { Button } from "symphony-ui";
import {BeatLoader} from 'react-spinners';
import { useSelector } from "react-redux";

export const UploadLogo = () => {
  const theme = useSelector((state: any) => state.theme.value.name);

  const [clinicName, setClinicName] = useState("");
  const [logoBase64, setLogoBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [buttonState, setButtonState] = useState("initial");

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
    setButtonState("loading");
  
    try {
      await handleSaveChanges();
      setButtonState("finish");
  
      setTimeout(() => {
        setButtonState("initial");
      }, 3000);
    } catch (error) {
      console.error("Error during save:", error);
      setButtonState("initial");
    }
  };
  
  const handleSaveChanges = async () => {
    if (!logoBase64) {
      console.error("No logo to save");
      return;
    }
  
    try {
      const response = await Application.saveLogo({
        logo: logoBase64,
      });
  
      console.log("Response from server:", response);
      console.log("Clinic Name:", clinicName);
      console.log("Logo Base64:", logoBase64);

    } catch (error) {
      console.error("Error saving logo:", error);
    }
  };

  return (
      <div className="  w-full flex h-[435px] items-start justify-center pt-10 px-6  bg-black-primary border border-main-border rounded-md">
      <div className={"flex-1 p-10 flex items-center justify-start  flex-col gap-3.5 "}>
        <div>
          <h1 className={"mb-5 block text-gray-300 text-xs"}>Current Logo</h1>
          <div
              className="border w-fit py-5 px-2 border-main-border rounded-lg text-center text-primary-text flex flex-col items-center gap-5">
            <img className={"w-[170px] h-[150px]"} src={"/Themes/Aurora/icons/EmptyStateLogo.svg"}/>
          </div>
        </div>
        <h1 className={"block text-gray-300 text-xs"}>No logo uploaded yet.</h1>
      </div>
        <div className="  flex flex-col items-center justify-start py-10 pr-10 w-[800px] ">
          <div className="mb-6 w-full ">
            <label className="block text-primary-text text-xs font-normal mb-2">
          Clinic Name
        </label>
        <input
          type="text"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          placeholder="Enter clinic name..."
          className=" outline-none w-full h-[32px] p-3 rounded-lg bg-black-primary border border-main-border text-xs text-primary-text"
        />
      </div>

      <div className=" w-full  mb-8">
        <label className="block text-gray-300 text-xs mb-2">Clinic Logo</label>
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border  border-main-border rounded-lg py-4 text-center text-primary-text flex flex-col items-center gap-5"
        >
          <img src="./Themes/Aurora/icons/uploadlogo.svg" alt=""/>
          <label htmlFor="fileUpload" className="cursor-pointer text-xs">
            Drag and drop a file here or{" "}
            <span className="text-brand-primary-color">upload a file</span>
            <div className="text-xs text-secondary-text mt-2">
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
              className="w-full max-w-xl mb-4 flex items-center justify-between bg-black-secondary border border-main-border px-4 py-2 rounded-md">
            <span className="text-primary-text text-xs mr-3">{fileName}</span>
            <div className="flex items-center justify-between gap-2 w-full">
            <div className="relative w-full h-2 bg-main-border rounded">
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
        <div className="w-full max-w-xl mb-4 flex items-center justify-between bg-black-secondary border border-main-border px-4 py-2 rounded-md">
          <div className="flex items-center gap-1">
            <img src="./Themes/Aurora/icons/XMLID_1737_.svg" alt="" />
            <span className="text-gray-200">{fileName}</span>
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
    <p>Upload Your Logo</p>
  </div>}
  {buttonState === 'loading' && <BeatLoader size={10} color="white"/>}
  {buttonState === 'finish' && (
      <div className="flex justify-center items-center gap-1">
      <div className={`${theme}-icons-check`} />
      Upload Your Logo
    </div>
  )}
</Button>
    </div>
      </div>
  );
};
