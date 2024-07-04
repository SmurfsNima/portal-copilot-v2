/* eslint-disable @typescript-eslint/no-explicit-any */
import clinic from '@/assets/images/clinic.png';
import SearchBox from '../searchBox';
import { useSelector } from 'react-redux';
import React from 'react';

const TopBar:React.FC = () => {
    const theme = useSelector((state:any) => state.theme.value.name)
    return (
        <>
            <div className={`${theme}-TopBar-container`}>
                <div className={`${theme}-TopBar-container-main`}>
                    <SearchBox placeholder='Search for Repots, Interventions, Biomarkers...' theme={theme}></SearchBox>
                    <div className={`${theme}-TopBar-container-main-boxLayer`}>
                        <div className={`${theme}-TopBar-Button-layer`}>
                            <img src={'./Themes/Aurora/icons/notification.svg'}  alt="" />
                        </div>                        
                        <div className={`${theme}-TopBar-Button-layer`}>
                            <img src={clinic} alt="" />
                        </div>
                        <div>
                            <div className={`${theme}-Text-sm`}>Clinic Longevity 1</div>
                            <div className={`${theme}-Text-xs`}>Clinic-Longevity-1@gmail.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopBar