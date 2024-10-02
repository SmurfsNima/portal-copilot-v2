import { ActivityMenu, AiChat, SearchBox, StatusMenu } from "@/components";
import { useEffect, useState } from "react";
import { ClientCard } from "./ClientCard";
import { Application } from "@/api";

type menuItem = {
  name: string;
};

interface Patient {
  Email: string;
  Name: string;
  Status: string;
  member_id: number;
}

export const AiStudio = () => {
  const [activeMenu, setActiveMenu] = useState("Overview");
  const [isStateOpen, setIsStateOpen] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(true);
  const [isEngagementOpen, setIsEngagementOpen] = useState(true);
  const [cardActive, setcardActive] = useState(0);
  const [activeStatus, setActiveStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [activeMemberID, setActiveMemberID] = useState<number | null>(null);
  const [overviewData, setOverviewData] = useState<any>(null);

  const toggleStateSection = () => setIsStateOpen(!isStateOpen);
  const toggleAlertSection = () => setIsAlertOpen(!isAlertOpen);
  const toggleEngagementSection = () => setIsEngagementOpen(!isEngagementOpen);

  const menus: Array<menuItem> = [
    { name: "Overview" },
    { name: "Copilot" },
    { name: "Weekly report" },
  ];

  const filteredClients = patients.filter((client) => {
    const matchesSearch = client.Name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeStatus === "All" || client.Status === activeStatus;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Application.aiStudio_patients();
        setPatients(response.data);

        const res = await Application.aiStudio_overview({
          member_id: activeMemberID || 997866112777, // Use activeMemberID if available
        });
        setOverviewData(res.data); // Store the overview data
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [activeMemberID]); // Fetch data when activeMemberID changes

  const status: Array<string> = ["All", "Need to Check", "Checked"];

  return (
    <div className="bg-black-background h-full w-full overflow-hidden px-5 flex items-start gap-2">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-center">
          <ActivityMenu activeMenu={activeMenu} menus={menus} onChangeMenuAction={(menu) => setActiveMenu(menu)} />
        </div>
        {activeMenu === "Overview" ? (
          <>
            <div className="w-full bg-black-primary border border-main-border px-[6px] py-[2px] flex items-center gap-3 rounded-md">
              <input
                className="w-full border border-main-border bg-black-secondary py-1 rounded-md outline-none text-[10px] text-primary-text"
                type="text"
              />
              <img className="cursor-pointer" src="/Themes/Aurora/icons/send.svg" alt="" />
            </div>
            <div className="bg-black-primary text-primary-text p-4 rounded-lg space-y-5">
              <div
                onClick={toggleStateSection}
                className="flex items-center cursor-pointer gap-2 text-sm font-medium"
              >
                <img
                  src="/Themes/Aurora/icons/chevron-up.svg"
                  className={`transition-transform  ${!isStateOpen && "rotate-180"}`}
                  alt=""
                />
                General Condition
                <div className="h-[1px] w-full bg-primary-text" />
              </div>
              {isStateOpen && (
                <div className="text-xs">
                  <p className="mt-4 text-secondary-text">
                    {overviewData ? overviewData.description : "Loading..."}
                  </p>
                </div>
              )}
              <div onClick={toggleAlertSection} className="text-sm font-medium cursor-pointer flex gap-2 items-center">
                <img
                  src="/Themes/Aurora/icons/chevron-up.svg"
                  className={`transition-transform ${!isAlertOpen && "rotate-180"}`}
                  alt=""
                />
                Alert
                <div className="h-[1px] w-full bg-primary-text" />
              </div>
              <div onClick={toggleEngagementSection} className="text-sm font-medium cursor-pointer flex gap-2 items-center">
                <img
                  src="/Themes/Aurora/icons/chevron-up.svg"
                  className={`transition-transform ${!isEngagementOpen && "rotate-180"}`}
                  alt=""
                />
                Limits & Contradiction
                <div className="h-[1px] w-full bg-primary-text" />
              </div>
            </div>
          </>
        ) : activeMenu === "Copilot" ? (
          <AiChat memberID={activeMemberID} />
        ) : (
          <div>vvvv</div>
        )}
      </div>

      <div className="flex flex-col gap-2 justify-start ">
        <SearchBox changeHandler={(e) => setSearchQuery(e.target.value)} theme="Aurora" placeholder="Search for client..." />
        <StatusMenu status={status} activeStatus={activeStatus as any} onChange={(value) => setActiveStatus(value)} />

        <div className="flex flex-col pr-1 max-h-[531px] w-full overflow-auto">
          {filteredClients.map((client, i) => (
            <ClientCard
              index={i}
              key={client.Name}
              name={client.Name}
              email={client.Email}
              onClick={() => {
                setcardActive(i + 1); // Update the active card index
                setActiveMemberID(client.member_id); // Set active member ID
              }}
              status={client.Status}
              cardActive={cardActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};