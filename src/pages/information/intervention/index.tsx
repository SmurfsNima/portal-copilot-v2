import { useState } from "react";
import { useSelector } from "react-redux";

import {
  TabsWrapper,
  InfoCard,
  SearchBox
} from "@/components";
import { Button } from "symphony-ui";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { DoughnutChart } from "@/components/charts";
import { RightChartCard } from "../diagnosis/RightChartcard";
import { InterventionCard } from "./interventionCard";
 const TabsInfo = [
    {
        text: 'All',
        path : '',
    },
    {
        text: 'Genomics',
        path : '',
        number: 4,
    },
    {
        text: 'Epigenomics',
        path : '',
        number: 0
    },
    {
        text : 'Proteomics',
        path : '',
        number : 1
    },
    {
        text: 'Metabolomics',
        path : '',
        number: 2,
    },
    {
        text: 'Microbiomics' ,
        path : '',
        number: 1
    }
 ]
 const InterventionCardInfo = [

    {
       
       icon : 'diet' ,
       title : 'Embrace a Diet Rich in Fiber',
       text :'Embrace a diet rich in fiber, such as       fruits, vegetables, and whole grains while avoiding simple sugars and       high glycemic index foods. Opt for low-fat dairy and lean meat.' ,
       buttons : [ 'Diabetes' , 'Blood Pressure']
    },
    {
       
       icon : 'yoga' ,
       title : 'Practice Yoga or Meditation',
       text :"Practice stress-reduction techniques       such as yoga or meditation, which can help reduce cortisol levels and       improve insulin resistance.",
       buttons : [ 'Diabetes' , 'Blood Pressure']
    
    },
    {
       
       icon : 'moon' ,
       title : 'Sleep of 7-9 Hours per Night',
       text :'Ensure adequate sleep of 7-9 hours per night, as poor sleep can disrupt hormones and worsen insulin resistance.' ,
       buttons : [ 'Diabetes' , 'Blood Pressure']

    },
    {
       
       icon : 'exercise' ,
       title : 'Exercise Aerobic',
       text :'Engage in regular aerobic exercises such       as jogging, swimming, or biking, which can help improve lipid profiles by       increasing HDL and lowering LDL cholesterol.' ,
       buttons : [ 'Cholesterol' ]

    },
    {
       
        icon : 'alcohol' ,
        title : 'Avoid Alcohol and Heavy Meals',
        text :'Try to avoid alcohol and heavy meals       close to bedtime, as they can interfere with sleep quality and       potentially influence lipid metabolism negatively.' ,
        buttons : [ 'Diabetes' , 'Cholesterol']
     },
    {
       
       icon : 'water' ,
       title : 'Remember to Drink Water',
       text :'Increase your water intake to at least 8 glasses daily. Proper hydration is essential for maintaining stable blood pressure and overall health. ' ,
       buttons : [ 'Diabetes' , 'Cholesterol']
    },
    {
       
       icon : 'antioxidants' ,
       title : 'Add Antioxidants to Your Diet',
       text :'Consume foods high in antioxidants, such as a variety of berries, nuts, and green leafy vegetables. Including these foods in your diet helps protect your cells from damage.' ,
       buttons : [ 'Diabetes' , 'Blood Pressure']
    },
   
  
 ]
export const Intervention = () => {
  const theme = useSelector((state: any) => state.theme.value.name);
  const [active, setActive] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(true);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className=" w-full h-full flex flex-col  overflow-hidden  gap-3 ">
      <InfoCard></InfoCard>
      <div className=" flex    items-center gap-2">
        <SearchBox
          theme="Aurora"
          placeholder="Quick alphabetical search for biomarkers"
        />
        <div className="rounded-xl bg-black-primary border border-main-border flex text-xs text-primary-text">
          <div className="border-r border-main-border px-4 py-1">
            <div className="bg-black-secondary py-[10px] px-6 rounded-2xl">
              Critical
            </div>
          </div>
          <div className="border-r border-main-border px-4 py-1">
            <div className="bg-black-secondary rounded-2xl py-[10px] px-6">
              Low
            </div>
          </div>
          <div className="px-4 py-1">
            <div className="bg-black-secondary rounded-2xl py-[10px] px-6">
              Medium
            </div>
          </div>
        </div>
      </div>
      <TabsWrapper TabsInfo={TabsInfo} />
      <div className="flex   w-full gap-5">
        <div
          id="charts-container"
          className={`w-full ${
            active
              ? "grid-cols-1  max-w-[330px] gap-10 h-full  "
              : " grid-cols-4"
          } grid  gap-3  `}
        >
          <div
            className={`flex  ${
              active ? "flex-row" : "flex-col"
            }  gap-5 w-full `}
          >
            <div
              onClick={() => setActive("chat")}
              className={` ${
                active && "hidden"
              } cursor-pointer flex justify-center items-center gap-2 bg-brand-primary-color rounded-xl text-sm font-medium px-8 py-4`}
            >
              <img className={`${theme}-icons-stars`} alt="" />{" "}
              <h2
                className={`${
                  active && "hidden"
                } text-sm font-medium text-black-primary`}
              >
                Analyze by AI-Copilot
              </h2>
            </div>

            <div
              onClick={() => setActive(null)}
              className={` bg-black-primary rounded-xl flex items-center justify-center px-5  ${
                active ? "" : "hidden"
              }`}
            >
              <img className={`${theme}-icons-arrow-left`} />
            </div>

            <div
              id="custom-border"
              className={`${
                active ? "px-8 py-4" : "px-12 py-8"
              } text-nowrap w-full  flex justify-center items-center gap-2 text-white cursor-pointer custom-border`}
            >
              <img className={`${theme}-icons-Add`} alt="" />
              <h2 className="text-xs font-medium text-secondary-text">
                Add New Intervention
              </h2>
            </div>
          </div>

          {InterventionCardInfo.map((item, i) => (
           <InterventionCard key={i} icon={item.icon} title={item.title} text={item.text} buttons={item.buttons} active={active} setActive={setActive}  />
          ))}
        </div>
        {active && (
            <div className=" w-full flex flex-col gap-3">
            <div className="flex  gap-6 w-full justify-between  ">
          <div className="px-6 pt-6 pb-2 bg-black-primary w-full h-fit max-h-[556px]    rounded-2xl border border-main-border">
            <h4 className="font-medium text-primary-text">Diagnosis Details</h4>
            <div className="flex justify-center gap-3 mt-5">
              <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-lg bg-black-third text-orange-status ">
                <div className=" bg-black-primary rounded-2xl px-3 py-1">
                  160mg/dl
                </div>
                <h6 className="text-xs font-medium">Patient Value</h6>
              </div>
              <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-lg bg-black-third text-brand-primary-color ">
                <div className=" bg-black-primary rounded-2xl px-3 py-1">
                  160mg/dl
                </div>
                <h6 className="text-xs font-medium">Patient Value</h6>
              </div>
              <div className="flex flex-col items-center justify-center p-3 gap-2 rounded-lg bg-black-third text-brand-secondary-color ">
                <div className=" bg-black-primary rounded-2xl px-3 py-1">
                  160mg/dl
                </div>
                <h6 className="text-xs font-medium">Patient Value</h6>
              </div>
            </div>
            <div className="text-secondary-text flex items-center gap-5 my-4">
              Show more details{" "}
              <img
               
                className={` ${theme}-icons-arrow-up ${!showDetails && "rotate-180"}`}
                onClick={toggleDetails}
                width={8}
                alt=""
              />
            </div>
            {showDetails && (
              <div className="flex flex-col gap-4 text-primary-text">
                <div className="w-full h-[1px] rounded-full bg-secondary-text" />
                <div className="w-full flex justify-between  items-center">
                  Diagnosis Type{" "}
                  <div className="bg-brand-primary-color px-3 py-1 rounded-2xl text-black-background text-xs font-normal">
                    Metabolomics
                  </div>
                </div>
                <div className="w-full flex justify-between  items-center">
                  Diagnosis Severity{" "}
                  <div className="bg-red-status px-3 py-1 rounded-2xl text-black-background text-xs font-normal">
                    Critical
                  </div>
                </div>
                <div className="w-full flex justify-between  items-center">
                  Date of Diagnosis{" "}
                  <div className="bg-black-third px-3 py-1 rounded-2xl text-primary-text text-xs font-normal">
                    17 May, 2024
                  </div>
                </div>
                <div className="w-full flex justify-between  items-center">
                  <div className="flex items-center gap-4">
                    Diagnosis Severity{" "}
                    <Link to="">
                      <FiExternalLink></FiExternalLink>
                    </Link>{" "}
                  </div>
                  <div className="bg-black-third px-3 py-1 rounded-2xl text-primary-text text-xs font-normal">
                    Dr.Jenny Wilson
                  </div>
                </div>
                <div className="flex justify-center  w-full ">
                  <DoughnutChart />
                </div>
              </div>
            )}
          </div>
          <div className="px-6 pt-3 pb-2 bg-black-primary w-full max-w-[492px]  max-h-[502px]   rounded-2xl border border-main-border">
          <h4 className="font-medium text-primary-text">Related Biomarkers</h4>
          <div id="copilot-chat" className=" w-full  flex  flex-col items-start justify-start mt-4 gap-4 h-full max-h-[445px] overflow-auto  ">
            <RightChartCard  type={active}
            isMeasured={false}
            value={55}
            status="active"/>
            <RightChartCard  type={'Diabetes'}
            isMeasured={false}
            value={55}
            status="active"/>
            <RightChartCard  type={'Blood Pressure'}
            isMeasured={false}
            value={55}
            status="active"/>
          </div>

          </div>
         
        
          </div>
          {
            active && (
                <div className="bg-black-primary w-full h-full max-h-[110px]  flex flex-col  rounded-2xl border border-main-border px-6 pt-3 pb-2 ">
                <div className="flex gap-1">
                  <img className={`${theme}-icons-logo`} width={24} alt="" />
                  <h2 className="text-primary-text text-14 font-medium">
                    AI-Copilot
                  </h2>
                </div>
                <div className=" mt-6 flex w-full justify-between items-center  ">
                  <h5 className="text-secondary-text text-sm font-normal">
                    5 Biomarkers need updated information. Send notification to
                    patient?
                  </h5>
                  <div className="flex gap-3 items-center  ">
                    <Button theme={theme+'-secondary'}>
                      <img className={`${theme}-icons-openbook`} alt="" />
                      Learn more
                    </Button>
                    <Button theme={theme} onClick={()=>setActive("chat")}>
                      Get started
                      <img
                       className={`${theme}-icons-arrow-right`}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            )
          }
          </div>
          
        )}
        
      </div>

    </div>
  );
};
