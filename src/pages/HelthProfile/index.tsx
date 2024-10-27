/* eslint-disable @typescript-eslint/no-explicit-any */
import { Accordion } from "@/components";
import border from "../../assets/images/profile-img-border.svg";
// import NullPage from '../../assets/images/Group.png';
import { useSelector } from "react-redux";
import { useState } from "react";
import { Application } from "@/api";
import { Button, TextField } from "symphony-ui";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useConstructor } from "@/help";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import LocationCombobox from "./LocationCombobox";

interface FileData {
  name: string;
  base64: any;
}
const HelthProfile = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const { id } = useParams();
  const [serachParametr] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  console.log(serachParametr.get("name"));
  const [files, setFiles] = useState<FileData[]>([]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const filesWithBase64 = selectedFiles.map((file) => {
      return new Promise<FileData>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            resolve({
              name: file.name,
              base64: reader.result,
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
  };
  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const [menu] = useState("Summary");
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [image, setImage] = useState<any>("");
  const resolveStatusColor = (text: string) => {
    if (text == "Connected" || text == "Complete") {
      return "#06C78D";
    }
    if (text == "Disconnected" || text == "Incomplete") {
      return "#FBAD37";
    }
  };
  useConstructor(() => {
    setIsLoading(true);
    Application.getSummary(id as string).then((res) => {
      console.log(res);
      if (res.data != "Internal Server Error") {
        setData(res.data);
        formik.setFieldValue("firstName", res.data.personal_info["first_name"]);
        formik.setFieldValue("lastName", res.data.personal_info["last_name"]);
        setImage(res.data.personal_info.picture);
        formik.setFieldValue(
          "workOuts",
          res.data.personal_info["total workouts"] != "No Data"
            ? res.data.personal_info["total workouts"]
            : ""
        );
        formik.setFieldValue(
          "Activity",
          res.data.personal_info["total Cardio Activities"] != "No Data"
            ? res.data.personal_info["total Cardio Activities"]
            : ""
        );
        formik.setFieldValue(
          "expert",
          res.data.personal_info.expert ? res.data.personal_info.expert : ""
        );
        formik.setFieldValue(
          "location",
          res.data.personal_info.Location ? res.data.personal_info.Location : ""
        );
      }
      setIsLoading(false);
    });
  });
  const [showAddNote, setShowAddNote] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      workOuts: "",
      Activity: "",
      expert: "",
      location: "",
    },
    onSubmit: () => {},
  });
  // const accordians = [
  //     {
  //         name:'Activity'
  //     },
  //     {
  //         name:'Diet'
  //     },
  //     {
  //         name:'Supplement'
  //     },
  //     {
  //         name:'Mind'
  //     }
  // ]
  // const [isFormMode,setIsFormMode] = useState(false)
  return (
    <>
      <div className="px-8 mb-2">
        <div className="w-[50px]">
          <div
            onClick={() => {
              if (isEditMode) {
                setIsEditMode(false);
              } else {
                navigate(-1);
              }
              // setisCreateReportMode(false)
              // setShowGenerateButton(true)
            }}
            className={`Aurora-tab-icon-container cursor-pointer h-[35px]`}
          >
            <img className={`Aurora-icons-arrow-left`} />
          </div>
        </div>
      </div>
      {isEditMode ? (
        <div className="w-full inset-0 z-10  flex items-center justify-center  px-8  bg-opacity-50">
          <div className="dark:bg-black-secondary border border-light-border-color dark:border-none min-h-[276px]  relative text-light-secandary-text dark:text-primary-text p-6 rounded-lg w-full dark:shadow-lg ">
            <div className="w-full flex justify-between">
              <div> Edit Health Profile</div>
              <Button
                onClick={() => {
                  Application.updateSummary({
                    member_id: id,
                    first_name: formik.values.firstName,
                    last_name: formik.values.lastName,
                    expert: formik.values.expert,
                    picture: image,
                    location: formik.values.location,
                    total_workouts: formik.values.workOuts,
                    total_cardio_activities: formik.values.Activity,
                  }).then((res) => {
                    toast.success(res.data);
                  });
                  setData((pre: any) => {
                    const old = pre;
                    old.personal_info = {
                      first_name: formik.values.firstName,
                      last_name: formik.values.lastName,
                      picture: image,
                      expert: formik.values.expert,
                      Location: formik.values.location,
                      email: data.personal_info.email,
                      "total workouts": formik.values.workOuts,
                      "total Cardio Activities": formik.values.Activity,
                    };
                    return old;
                  });
                  setIsEditMode(false);
                }}
                theme="Aurora"
              >
                <img src="./Themes/Aurora/icons/tick-square.svg" alt="" />
                Apply Changes
              </Button>
            </div>

            <div className="w-full flex justify-between mt-4">
              <div className="">
                <div className="flex text-center self-center  justify-center relative items-center pt-4">
                  <img src={border} className="w-[71px] h-[71px]" alt="" />
                  <img
                    className="absolute w-[60px] h-[60px] rounded-full"
                    src={
                      image != ""
                        ? image
                        : `https://ui-avatars.com/api/?name=${data?.personal_info.first_name}`
                    }
                    alt=""
                  />
                  <div
                    onClick={() => {
                      document.getElementById("fileUploader")?.click();
                    }}
                    className="absolute cursor-pointer right-[-12px] bottom-[-8px] w-[42px] h-[42px] "
                  >
                    <div className="w-full h-full bg-[#121212] opacity-50 rounded-full"></div>
                    <div className="absolute w-full h-full flex justify-center items-center top-0 left-0">
                      <img
                        src="./Themes/Aurora/icons/gallery-edit.svg"
                        alt=""
                      />
                    </div>
                    <input
                      onChange={(event: any) => {
                        const fileReader = new FileReader();
                        const file = event.target.files[0];
                        fileReader.readAsDataURL(file);
                        fileReader.onload = () => {
                          setImage(fileReader.result);
                        };
                      }}
                      type="file"
                      accept=".png"
                      className="invisible"
                      id="fileUploader"
                    />
                  </div>
                </div>
                <div className="text-[10px] absolute text-light-primary-text dark:text-[#FFFFFF99] text-left mt-4">
                  {data?.personal_info.email.substring(0, 30)}
                </div>
              </div>
              <div className="grid gap-4 grid-cols-3">
                <div className="w-[330px]">
                  <TextField
                    {...formik.getFieldProps("firstName")}
                    label="First Name:"
                    theme="Aurora"
                    placeholder="Your client's name"
                    name="firstName"
                    type="text"
                    inValid={false}
                  ></TextField>
                </div>

                <TextField
                  {...formik.getFieldProps("workOuts")}
                  label="Total Workouts:"
                  theme="Aurora"
                  placeholder="Workouts hours..."
                  name="workOuts"
                  type="text"
                  inValid={false}
                ></TextField>

                <TextField
                  {...formik.getFieldProps("expert")}
                  label="Expert:"
                  theme="Aurora"
                  placeholder="Write your expert name..."
                  name="expert"
                  type="text"
                  inValid={false}
                ></TextField>

                <TextField
                  {...formik.getFieldProps("lastName")}
                  label="Last Name:"
                  theme="Aurora"
                  placeholder="Your client's last name"
                  name="lastName"
                  type="text"
                  inValid={false}
                ></TextField>

                <TextField
                  {...formik.getFieldProps("Activity")}
                  label="Total Cardio Activities:"
                  theme="Aurora"
                  placeholder="Total cardio activities hours..."
                  name="Activity"
                  type="text"
                  inValid={false}
                ></TextField>

                {/* <TextField
                  {...formik.getFieldProps("location")}
                  label="Location:"
                  theme="Aurora"
                  placeholder="Choose"
                  name="location"
                  type="text"
                  inValid={false}
                ></TextField> */}
                <LocationCombobox   value={formik.values.location}
              onChange={(value) => formik.setFieldValue("location", value)} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full inset-0 z-10  flex items-center justify-center px-8  bg-opacity-50">
            <div className="dark:bg-[#1E1E1E] min-h-[476px] overflow-hidden relative text-light-secandary-text dark:text-primary-text border border-light-border-color dark:border-none p-6 rounded-lg w-full dark:shadow-lg ">
              {isLoading ? (
                <div className="w-full flex justify-center items-center h-[300px]">
                  <BeatLoader size={10} color="#0CBC84"></BeatLoader>
                </div>
              ) : (
                <>
                  <div className="text-[12px] mb-4 font-medium">
                    Health Profile
                  </div>
                  <div className="mt-2">
                    {menu == "Summary" ? (
                      <>
                        <div className="w-full flex justify-between">
                          <div className="w-[300px] h-[388px] relative border border-light-border-color dark:border-none dark:bg-[#272727] rounded-[16px]">
                            <div
                              onClick={() => {
                                setIsEditMode(true);
                              }}
                              className="absolute right-3 cursor-pointer top-3"
                            >
                              <img
                                src="./Themes/Aurora/icons/edit.svg"
                                alt=""
                              />
                            </div>
                            <div className="flex justify-center items-center pt-4">
                              <img
                                src={border}
                                className="w-[71px] h-[71px]"
                                alt=""
                              />
                              <img
                                className="absolute w-[60px] h-[60px] rounded-full"
                                src={
                                  data?.personal_info.picture != ""
                                    ? data?.personal_info.picture
                                    : `https://ui-avatars.com/api/?name=${data?.personal_info.first_name}`
                                }
                                alt=""
                              />
                              {/* <div className="absolute text-[#FFFFFF61] text-[38px]">LA</div> */}
                            </div>
                            <div className="dark:text-[#FFFFFFDE] text-light-primary-text opacity-[60%] mt-6 text-center text-[20px]">
                              {data?.personal_info.first_name +
                                " " +
                                data?.personal_info.last_name}
                            </div>
                            <div className="px-5 flex flex-col gap-4 mt-6">
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <img
                                    className="Aurora-icons-DataEntry w-[15px]"
                                    alt=""
                                  />
                                  <div className="text-[12px] font-medium dark:text-[#FFFFFFDE] text-light-primary-text">
                                    Total workouts:
                                  </div>
                                </div>
                                <div className="dark:text-[#FFFFFF99] text-light-secandary-text text-[12px]">
                                  {data?.personal_info["total workouts"]}
                                </div>
                              </div>

                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <img
                                    className="Aurora-icons-DataEntry w-[15px]"
                                    alt=""
                                  />
                                  <div className="text-[12px] font-medium dark:text-[#FFFFFFDE] text-light-primary-text">
                                    Total Cardio Activities:
                                  </div>
                                </div>
                                <div className="text-[#FFFFFF99] text-[12px]">
                                  {
                                    data?.personal_info[
                                      "total Cardio Activities"
                                    ]
                                  }
                                </div>
                              </div>

                              {/* <div className="flex w-full items-center justify-between">
                                                    <div className="flex items-center gap-1">
                                                        <img className="Aurora-icons-DataEntry w-[15px]" alt="" />
                                                        <div className="text-[12px] font-medium text-[#FFFFFFDE]">Garmin:</div>
                                                    </div>
                                                    <div className="text-[#6432C9] text-[12px]">Ask to Connect</div>
                                                </div>    */}

                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <div className="text-[12px] font-medium dark:text-[#FFFFFFDE] text-light-primary-text">
                                    Expert:
                                  </div>
                                </div>
                                <div className="dark:text-[#FFFFFF99] text-light-secandary-text text-[12px]">
                                  {data?.personal_info["expert"]}
                                </div>
                              </div>

                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <div className="text-[12px] font-medium dark:text-[#FFFFFFDE] text-light-primary-text">
                                    Location:
                                  </div>
                                </div>
                                <div className="dark:text-[#FFFFFF99] text-light-secandary-text text-[12px]">
                                  {data?.personal_info["Location"]}
                                </div>
                              </div>

                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1">
                                  {/* <img className="Aurora-icons-DataEntry w-[15px]" alt="" /> */}
                                  <div className="text-[12px] font-medium dark:text-[#FFFFFFDE] text-light-primary-text">
                                    E-mail:
                                  </div>
                                </div>
                                <div className="dark:text-[#FFFFFF99] text-light-secandary-text text-[12px]">
                                  {data?.personal_info["email"]}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[300px] h-[388px] border border-light-border-color dark:border-none dark:bg-[#272727] rounded-[16px]">
                            <div className="w-full flex justify-between px-5 py-3">
                              <div className="text-[14px] text-light-secandary-text dark:text-[#FFFFFFDE]">
                                Data Syncing
                              </div>
                            </div>
                            <div className="w-full border-t border-[#383838]"></div>
                            <div className="px-2 mt-2">
                              <div className="w-full border border-light-border-color dark:border-[#383838] text-light-secandary-text dark:text-[#FFFFFFDE] text-[12px] px-4 pr-6 h-[48px]  flex justify-between items-center rounded-[12px]">
                                <div>Data</div>
                                <div>Last Sync</div>
                                <div>State</div>
                              </div>
                              {data ? (
                                <>
                                  {data["Data Syncing"]?.length > 0 ? (
                                    <>
                                      <div className="flex justify-center w-full items-start overflow-hidden h-[300px]">
                                        <div className="w-full mt-2">
                                          {data["Data Syncing"]?.map(
                                            (el: any) => {
                                              return (
                                                <div className="dark:bg-[#2F2F2F] border border-light-border-color dark:border-none mb-1 px-4 h-[48px] w-full rounded-[12px] flex justify-between items-center">
                                                  <div className="text-[10px] w-[50px] text-light-secandary-text dark:text-[#FFFFFFDE]">
                                                    {el.Data}
                                                  </div>
                                                  <div>{el["Last Sync"]}</div>
                                                  <div className="text-[8px] w-[60px]">
                                                    <div
                                                      className="rounded-[16px]  px-1 py-1 text-[#1E1E1E]"
                                                      style={{
                                                        backgroundColor:
                                                          resolveStatusColor(
                                                            el["State"]
                                                          ),
                                                      }}
                                                    >
                                                      {el["State"]}
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="flex justify-center items-center h-[300px]">
                                      <div>
                                        <img
                                          src="./images/Empty State.png"
                                          alt=""
                                        />
                                        <div className="text-[12px] text-[#FFFFFF61]">
                                          No Note to Show
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  <div className="flex justify-center items-center h-[300px]">
                                    <div>
                                      <img
                                        src="./images/Empty State.png"
                                        alt=""
                                      />
                                      <div className="text-[12px] text-[#FFFFFF61]">
                                        No Note to Show
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="w-[300px] h-[388px] border border-light-border-color dark:border-none dark:bg-[#272727] overflow-hidden rounded-[16px]">
                            <div className="w-full flex justify-between px-5 py-3">
                              <div className="text-[14px] text-light-secandary-text dark:text-[#FFFFFFDE]">
                                Data Tracking
                              </div>
                            </div>
                            <div className="w-full border-t border-[#383838]"></div>
                            <div className="px-2 mt-2">
                              <div className="w-full border dark:border-[#383838] border-x-light-border-color text-light-secandary-text dark:text-[#FFFFFFDE] text-[12px] px-4 h-[48px]  flex justify-between items-center rounded-[12px]">
                                <div>Data</div>
                                <div>Completed on</div>
                                <div>State</div>
                                <div>Action</div>
                              </div>

                              {data ? (
                                <>
                                  {data["Data Tracking"]?.length > 0 ? (
                                    <>
                                      <div className="flex justify-center w-full items-start overflow- h-[300px]">
                                        <div className="w-full mt-2">
                                          {data["Data Tracking"]?.map(
                                            (el: any) => {
                                              return (
                                                <div className="dark:bg-[#2F2F2F] border-light-border-color dark:border-none mb-1 px-4 h-[48px] w-full rounded-[12px] flex justify-between items-center">
                                                  <div className="text-[10px] w-[50px] text-light-secandary-text dark:text-[#FFFFFFDE]">
                                                    {el.Data.substring(0, 8) +
                                                      "..."}
                                                  </div>
                                                  <div className="w-[60px] text-[10px] flex justify-center">
                                                    {el["Completed on"]}
                                                  </div>
                                                  <div className="text-[8px] w-[60px]">
                                                    <div
                                                      className="rounded-[16px] flex justify-center px-1 py-1 text-[#1E1E1E]"
                                                      style={{
                                                        backgroundColor:
                                                          resolveStatusColor(
                                                            el["State"]
                                                          ),
                                                      }}
                                                    >
                                                      {el["State"]}
                                                    </div>
                                                  </div>
                                                  <div
                                                    onClick={() => {
                                                      // setIsFormMode(true)
                                                      Application.getDataTracking(
                                                        {
                                                          member_id: id,
                                                          form_name: el.Data,
                                                        }
                                                      ).then((res) => {
                                                        if (
                                                          typeof res.data ==
                                                          "string"
                                                        ) {
                                                          window.open(res.data);
                                                        } else {
                                                          navigate(
                                                            "/helthProfile/dataEntry/" +
                                                              el.Data +
                                                              "/" +
                                                              id
                                                          );
                                                        }
                                                      });
                                                      // navigate('/helthProfile/dataEntry')
                                                    }}
                                                    className="text-primary-color cursor-pointer text-[12px] w-[27px]"
                                                  >
                                                    {el["State"] == "Complete"
                                                      ? "View"
                                                      : "Fill"}
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="flex justify-center items-center h-[300px]">
                                      <div>
                                        <img
                                          src="./images/Empty State.png"
                                          alt=""
                                        />
                                        <div className="text-[12px] text-[#FFFFFF61]">
                                          No Note to Show
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  <div className="flex justify-center items-center h-[300px]">
                                    <div>
                                      <img
                                        src="./images/Empty State.png"
                                        alt=""
                                      />
                                      <div className="text-[12px] text-[#FFFFFF61]">
                                        No Note to Show
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="w-[300px] h-[388px] border border-light-border-color dark:border-none dark:bg-[#272727] rounded-[16px]">
                            <div className="w-full flex justify-between px-5 py-3">
                              <div className="text-[14px] text-light-secandary-text dark:text-[#FFFFFFDE]">
                                Trainer's Notes (
                                {data?.notes ? data.notes.length : "0"})
                              </div>
                              {!showAddNote && (
                                <div
                                  onClick={() => {
                                    setShowAddNote(true);
                                  }}
                                  className="text-[14px] flex cursor-pointer justify-start gap-1 text-[#03DAC5]"
                                >
                                  <img
                                    src="./Themes/Aurora/icons/Add.svg"
                                    alt=""
                                  />
                                  Add Note
                                </div>
                              )}
                            </div>
                            <div className="w-full border-t border-[#383838]"></div>
                            {showAddNote ? (
                              <div className="flex justify-center items-center">
                                <div className="w-full p-4">
                                  <div className="text-[12px] text-light-secandary-text dark:text-[#FFFFFFDE]">
                                    Note
                                  </div>
                                  <textarea
                                    value={commentText}
                                    onChange={(e) => {
                                      setCommentText(e.target.value);
                                    }}
                                    placeholder="Add your note for this client here..."
                                    className="h-[250px] font-light text-[14px] p-2 border border-light-border-color dark:border-[#383838] mt-1 rounded-[6px] dark:bg-[#272727] w-full"
                                  />
                                  <div className="flex justify-between items-center mt-2">
                                    <Button
                                      onClick={() => {
                                        setShowAddNote(false);
                                        setCommentText("");
                                      }}
                                      theme="Aurora-secondary"
                                      style={{ height: "24px" }}
                                    >
                                      <div className="w-[100px]">Cancel</div>
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        Application.addNoteHelth({
                                          member_id: id,
                                          note: commentText,
                                          writer: "",
                                        }).then(() => {
                                          setCommentText("");
                                          setShowAddNote(false);
                                          setData((pre: any) => {
                                            pre.notes.push({
                                              date: Date.now(),
                                              time: "14:14:32.274416",
                                              writer: "",
                                              note: commentText,
                                            });
                                            return pre;
                                          });
                                        });
                                      }}
                                      theme="Aurora"
                                      style={{ height: "24px" }}
                                    >
                                      <div className="w-[100px]">Save</div>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="flex justify-center items-center h-[300px] overflow-y-scroll"
                                style={{
                                  alignItems:
                                    data?.notes.length > 0 ? "start" : "center",
                                }}
                              >
                                {data?.notes?.length > 0 ? (
                                  <>
                                    <div className="w-full">
                                      {data?.notes.map((el: any) => {
                                        return (
                                          <div className="w-full px-3">
                                            <Accordion
                                              themes="Aurora-thertiry"
                                              title={el.date}
                                            >
                                              <div className="text-[12px] text-justify w-full">
                                                {el.note}
                                              </div>
                                            </Accordion>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </>
                                ) : (
                                  <div>
                                    <img
                                      src="./images/Empty State.png"
                                      alt=""
                                    />
                                    <div className="text-[12px] text-[#FFFFFF61]">
                                      No Note to Show
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className=" flex w-full justify-center">
                          <div className="w-full flex justify-between items-center">
                            <div className="bg-[#272727] max-w-[630px]">
                              <div className="text-[12px]  text-center mt-10 text-[#FFFFFFDE]">
                                <div className="mt-[4px] flex justify-start items-center">
                                  <div className="w-[3px] mr-2 h-[3px] bg-white rounded-full"></div>
                                  Once your file is selected, click the "Upload"
                                  button.
                                </div>
                                <div className="mt-[4px] flex justify-start items-center">
                                  <div className="w-[3px] mr-2 h-[3px] bg-white rounded-full"></div>{" "}
                                  Wait for the upload to complete and check for
                                  a confirmation message indicating success.
                                </div>
                              </div>

                              <div className="bg-black-primary relative mt-8 flex justify-center items-center rounded-[12px] w-[536px] h-[193px]">
                                <div
                                  onClick={() => {
                                    document
                                      .getElementById("fileUploader")
                                      ?.click();
                                  }}
                                  className="text-center "
                                >
                                  <div className="flex justify-center">
                                    <img
                                      src="./Themes/Aurora/icons/csvUpload.svg"
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-[12px] mt-3">
                                    Drag and drop a file here or{" "}
                                    <span className="text-[#03DAC5]">
                                      upload a file
                                    </span>
                                  </div>
                                  <div className="text-[#FFFFFF61] text-[12px]">
                                    CSV
                                  </div>
                                </div>

                                <input
                                  id="fileUploader"
                                  type="file"
                                  className="absolute invisible top-0 left-0 cursor-pointer w-full h-full"
                                  accept=".csv"
                                  multiple
                                  onChange={handleFileChange}
                                />
                              </div>
                              <div className="max-h-[120px] overflow-y-scroll">
                                {files.map((el, index) => {
                                  return (
                                    <>
                                      <div className="bg-black-primary flex justify-between py-2 items-center px-6 mt-2 h-[28px] rounded-[6px] w-full">
                                        <div className="flex items-center">
                                          <i
                                            className="fas fa-file-csv"
                                            style={{ marginRight: "8px" }}
                                          ></i>
                                          <div className="text-[12px]">
                                            {el.name}
                                          </div>
                                        </div>
                                        <img
                                          onClick={() => {
                                            handleDeleteFile(index);
                                          }}
                                          className="cursor-pointer"
                                          src="./Themes/Aurora/icons/trash.svg"
                                          alt=""
                                        />
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                              <div className="flex mt-8 justify-center w-full">
                                <Button
                                  onClick={() => {
                                    // Application.addClient({
                                    //     personal_info:{
                                    //         name:name,
                                    //         p_email:email,
                                    //     },
                                    //     csv_information:files.map(e =>e.base64)
                                    // })
                                    Application.addDataEntery({
                                      member_id: id,
                                      base64_strings: files.map((e) => {
                                        return {
                                          name: e.name,
                                          url: e.base64,
                                        };
                                      }),
                                    });
                                    navigate(-1);
                                    setFiles([]);
                                  }}
                                  theme={theme}
                                >
                                  <div className="text-[#1E1E1E] px-8">
                                    Save Changes
                                  </div>
                                </Button>
                              </div>
                            </div>
                            {/* <div className="bg-[#272727] z-30 w-[630px] h-[430px]"></div> */}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HelthProfile;
