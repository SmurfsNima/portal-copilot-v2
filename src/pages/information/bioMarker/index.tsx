import { InfoCard, SearchBox, TabsWrapper } from "@/components"
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
const BioMarker = () => {
    return (
        <>
        <div className="flex flex-col overflow-hidden w-full  items-start gap-4 px-12">
            <InfoCard></InfoCard>
            <div className="flex w-full justify-center">
                <div className=" flex w-full max-w-[1224px]  items-center gap-2">
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

            </div>
            <div className="flex w-full justify-center">
                <TabsWrapper TabsInfo={TabsInfo} />
            </div>

        </div>
        </>
    )
}

export default BioMarker