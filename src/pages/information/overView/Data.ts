import NutritionIcon from "/public/Themes/Aurora/icons/Nutriton-icon.svg";
import NutritionBorder from "/public/Themes/Aurora/icons/Nutrition-border.svg";
import ActivityIcon from "/public/Themes/Aurora/icons/Activity-logo.svg";
import Border from "/public/Themes/Aurora/icons/Activity-border.svg";
import SleepIcon from "/public/Themes/Aurora/icons/Sleep-icon.svg";
import MindIcon from "/public/Themes/Aurora/icons/Mind-icon.svg";
export const btnInfo =[
    {
        text : 'Patient Info',
      
    },
    {
        text : 'Appointments History',
       
    },
    {
        text : 'Allergies',
        number : 3,
    },
    {
        text : 'Current Biormarkers',
        number : 6,
    },
    {
        text : "Current Diagnosis",
        number : 3,
    },
    {
        text : 'Current Interventions',
        number : 4,
    },
    {
        text : 'Emergenecy Conditions',
        number : 1,
    },
    
]
export const appointments = [
    { date: '21 Aug, 2024', time: '8:30 pm', doctor: 'Dr. Daniel Alfonzo', isDone: false, details: 'more details' },
    { date: '19 Feb, 2024', time: '10:00 am', doctor: 'Dr. Daniel Alfonzo', isDone: true, details: 'more details' },
    { date: '05 Mar, 2024', time: '9:00 am', doctor: 'Dr. Daniel Alfonzo', isDone: true, details: 'more details' },
    { date: '27 Feb, 2024', time: '11:00 am', doctor: 'Dr. Daniel Alfonzo', isDone: true, details: 'more details' },
  ];
 export const patientMainInfo = [
    {
        name :  "Nutritions",
        value : 74,
        border : NutritionBorder,
        icon : NutritionIcon,
    },
    {
        name : "Activity",
        value: 79,
        border : Border,
        icon : ActivityIcon,
    },
    {
        name : "Sleep",
        value: 99,
        border : Border,
        icon : SleepIcon,
    },
    {
        name : "Mind",
        value: 83,
        border : Border,
        icon : MindIcon,
    },
 ]
 export const chartsInfo = [
    {type : "Temperature",
        isMeasured : false,
        value: 99.5,
        status: 'Active',
        
    },
    {type : "Heart Rate",
        isMeasured : true,
        value: 90,
        status: 'Active',
        
    },
    {type : "CBC",
        isMeasured : true,
        value: 40 ,
        status: 'Active',
        otherTypes : ['Hb' , 'HCT' , 'WBC' ,'MCHC' , 'MCH' , 'RBC', 'PLT' ],
}

 ]