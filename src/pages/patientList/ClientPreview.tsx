/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion, TabsWrapper } from "@/components";
import { useEffect, useRef, useState } from "react";
import border from "../../assets/images/profile-img-border.svg";
import NullPage from '../../assets/images/Group.png';
import { Button } from "symphony-ui";
import { useSelector } from "react-redux";
import { Application } from "@/api";
interface ClientPreviewProps{
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    name:string,
    email:string
}
interface FileData {
  name: string;
  base64: any;
}

const ClientPreview:React.FC<ClientPreviewProps> = ({
    isOpen,
    onClose,
    name,
    email
}) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const theme = useSelector((state: any) => state.theme.value.name);
    const tabs =[
        {
            text: "Summary",
            path : 'Summary',
            icon : true
        },    
        {
            text: "Data Entry",
            path : 'DataEntry',
            icon : true,
        },    
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },  
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },  
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },  
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },  
        {
            text: "Overview",
            path : '',
            icon : true,
            isVisible:false
        },                                                   
    ]
    const [files, setFiles] = useState<FileData[]>([])
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(event.target.files || []);
        const filesWithBase64 = selectedFiles.map((file) => {
        return new Promise<FileData>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
            if (reader.result) {
                resolve({
                name: file.name,
                base64: reader.result ,
                });
            }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
        });

        Promise.all(filesWithBase64).then((results) => {
        setFiles(results);
        });
    }
    const handleDeleteFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };
    const [menu,setMenu] = useState('Summary')
    const accordians = [
        {
            name:'Activity'
        },
        {
            name:'Diet'
        },
        {
            name:'Supplement'
        },
        {
            name:'Mind'
        }                        
    ]
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
    return (
        <>
        <div className="fixed inset-0 z-10  flex items-center justify-center bg-black-background bg-opacity-50">
            <div ref={modalRef} className="bg-black-secondary min-h-[476px] overflow-hidden relative text-primary-text p-6 rounded-lg w-[1012px] shadow-lg ">
                <button onClick={() => {onClose()}} className="text-lg absolute top-3 right-3">
                    <img src={"Themes/Aurora/icons/close.svg"}></img>
                </button>
                <TabsWrapper isNotNavigate TabsInfo={tabs} handleTabClick={(path) =>{
                    setMenu(path)
                }}/>
                <div className="mt-2">
                    {
                        menu == 'Summary' ?
                        <>
                            <div className="w-full flex justify-between">
                                <div className="w-[300px] h-[388px] bg-[#1E1E1E] rounded-[16px]">
                                    <div className="flex justify-center items-center pt-4">
                                        <img src={border} className="w-[71px] h-[71px]" alt="" />
                                        <div className="absolute text-[#FFFFFF61] text-[38px]">LA</div>
                                    </div>
                                    <div className="text-[#FFFFFFDE] opacity-[60%] mt-6 text-center text-[20px]">{name}</div>
                                    <div className="px-5 flex flex-col gap-4 mt-6">
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <img className="Aurora-icons-DataEntry w-[15px]" alt="" />
                                                <div className="text-[12px] font-medium text-[#FFFFFFDE]">Total workouts:</div>
                                            </div>
                                            <div className="text-[#FFFFFF99] text-[12px]">No Data</div>
                                        </div>

                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <img className="Aurora-icons-DataEntry w-[15px]" alt="" />
                                                <div className="text-[12px] font-medium text-[#FFFFFFDE]">Total Cardio Activities:</div>
                                            </div>
                                            <div className="text-[#FFFFFF99] text-[12px]">No Data</div>
                                        </div>

                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <img className="Aurora-icons-DataEntry w-[15px]" alt="" />
                                                <div className="text-[12px] font-medium text-[#FFFFFFDE]">Garmin:</div>
                                            </div>
                                            <div className="text-[#6432C9] text-[12px]">Ask to Connect</div>
                                        </div>   

                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <div className="text-[12px] font-medium text-[#FFFFFFDE]">Expert:</div>
                                            </div>
                                            <div className="text-[#FFFFFF99] text-[12px]">Nigel</div>
                                        </div>  

                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <div className="text-[12px] font-medium text-[#FFFFFFDE]">Location:</div>
                                            </div>
                                            <div className="text-[#FFFFFF99] text-[12px]">No Data</div>
                                        </div>  

                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                {/* <img className="Aurora-icons-DataEntry w-[15px]" alt="" /> */}
                                                <div className="text-[12px] font-medium text-[#FFFFFFDE]">E-mail:</div>
                                            </div>
                                            <div className="text-[#FFFFFF99] text-[12px]">Lesliealexander@gmail.com</div>
                                        </div>                                                                                                                                                                                                       
                                    </div>
                                </div>

                                <div>
                                    { accordians.map(el => {
                                        return (
                                        <div className="mb-2">
                                            <Accordion themes="Aurora-Secandary" title={el.name}>
                                               <div className="w-full flex justify-center">
                                                    <img className="w-[56px]" src={NullPage} alt="" />
                                               </div>
                                               <div className="text-[#FFFFFF61] text-[12px] text-center">No Result Found</div>
                                            </Accordion>                                    
                                        </div>
                                        )
                                    })}
                                </div>
                                
                                <div className="w-[300px] h-[388px] bg-[#1E1E1E] rounded-[16px]">
                                    <div className="w-full flex justify-between px-5 py-3">
                                        <div className="text-[14px] text-[#FFFFFFDE]">Trainer's  Notes (0)</div>
                                         <div className="text-[14px] flex justify-start gap-1 text-[#03DAC5]">
                                            <img src="./Themes/Aurora/icons/Add.svg" alt="" />
                                            Add Note</div>
                                    </div>
                                    <div className="w-full border-t border-[#383838]"></div>

                                    <div className="flex justify-center items-center h-[300px]">
                                        <div>
                                            <img src="./images/Empty State.png" alt="" />
                                            <div className="text-[12px] text-[#FFFFFF61]">No Note to Show</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className=" flex w-full justify-center">
                                <div>
                                    <div className="text-[12px]  text-center mt-10 text-[#FFFFFFDE]">
                                        <div className="mt-[4px] flex justify-start items-center"><div className="w-[3px] mr-2 h-[3px] bg-white rounded-full"></div>Once your file is selected, click the "Upload" button.</div>
                                        <div className="mt-[4px] flex justify-start items-center"><div className="w-[3px] mr-2 h-[3px] bg-white rounded-full"></div> Wait for the upload to complete and check for a confirmation message indicating success.</div>
                                    </div>

                                    <div className="bg-black-primary relative mt-8 flex justify-center items-center rounded-[12px] w-[536px] h-[193px]">
                                        <div onClick={() => {
                                            document.getElementById("fileUploader")?.click()
                                        }} className="text-center ">
                                            <div className="flex justify-center">
                                                <img src="./Themes/Aurora/icons/csvUpload.svg" alt="" />

                                            </div>
                                            <div className="text-[12px] mt-3">Drag and drop a file here or <span className="text-[#03DAC5]">upload a file</span></div>
                                            <div className="text-[#FFFFFF61] text-[12px]">CSV</div>
                                        </div>
                                        
                                        <input id="fileUploader" type="file" className="absolute invisible top-0 left-0 cursor-pointer w-full h-full" accept=".csv" multiple onChange={handleFileChange}  />
                                    </div>
                                    <div className="max-h-[120px] overflow-y-scroll">
                                        {
                                            files.map((el,index) => {
                                                return (
                                                    <>
                                                        <div className="bg-black-primary flex justify-between py-2 items-center px-6 mt-2 h-[28px] rounded-[6px] w-full">
                                                            <div className="flex items-center">
                                                                <i className="fas fa-file-csv" style={{ marginRight: '8px' }}></i>
                                                                <div className="text-[12px]">{el.name}</div>
                                                            </div>
                                                            <img onClick={() => {
                                                                handleDeleteFile(index)
                                                            }} className="cursor-pointer" src="./Themes/Aurora/icons/trash.svg" alt="" />
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }

                                    </div>
                                    <div className="flex mt-8 justify-center w-full">
                                        <Button onClick={() => {
                                            Application.addClient({
                                                personal_info:{
                                                    name:name,
                                                    p_email:email,
                                                },
                                                csv_information:files.map(e =>e.base64)
                                            })
                                            onClose()
                                            setFiles([])
                                        }} theme={theme}>
                                            <div className="text-[#1E1E1E] px-8">
                                                Save Changes

                                            </div>
                                            </Button>

                                    </div>

                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default ClientPreview