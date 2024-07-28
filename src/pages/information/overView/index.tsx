import React from "react";
import { btnInfo } from "./Data";
import { PationtInformation, Measurement, biomarker } from "@/types";
import { Application } from "@/api";
import { Accordion, Appointments } from "@/components";
import { InfoGraphicCenter } from "./infoGraphicCenter";
import { NormalChartCard } from "@/components/chartCard/normalChartCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
interface ChartDataItem {
  type: string;
  value: number;
  isMeasured: boolean;
  status: string;
  otherTypes: string[];
  chartData: {
    dates: string[];
    values: number[] | { Low: number[]; High: number[] };
  };
}
const OverView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PationtInformation | null>(null);
  useEffect(() => {
    if (id) {
      const patientId = parseInt(id, 10);
      if (!isNaN(patientId)) {
        Application.getPatients().then((res) => {
          const resolved: PationtInformation[] = res.data;
          if (Array.isArray(resolved)) {
            const foundPatient = resolved.find((p) => {
              return (
                p &&
                typeof p === "object" &&
                "member_id" in p &&
                p.member_id === patientId
              );
            });
            setPatient(foundPatient || null);
          }
        });
      }
    }
  }, [id]);

  const extractBiomarkerData = (
    biomarker?: Measurement[]
  ): { dates: string[]; values: number[] | { Low: number[]; High: number[] }; status: string } => {
    if (!Array.isArray(biomarker)) return { dates: [], values: [], status: "" };

    const dates = biomarker.map((measurement) => measurement.date);

    let values: number[] | { Low: number[]; High: number[] } = [];
    if (biomarker.some((measurement) => typeof measurement.value === "object" && measurement.value !== null && "Low" in measurement.value && "High" in measurement.value)) {
      const Low = biomarker.map((measurement) => (measurement.value as { Low: number }).Low);
      const High = biomarker.map((measurement) => (measurement.value as { High: number }).High);
      values = { Low, High };
    } else {
      values = biomarker.map((measurement) => {
        if (typeof measurement.value === "number") {
          return measurement.value;
        } else if (measurement.value.value !== undefined) {
          return measurement.value.value;
        }
        return 0;
      });
    }

    const status = biomarker.length
      ? typeof biomarker[0].value === "object" && 'status' in biomarker[0].value
        ? biomarker[0].value.status || ""
        : ""
      : "";
    return { dates, values, status };
  };

  const chartData: ChartDataItem[] =
    patient?.biomarkers.flatMap((biomarkerObject: Partial<biomarker>) => {
      return Object.entries(biomarkerObject).map(([key, biomarkerData]) => {
        const formattedData = extractBiomarkerData(
          biomarkerData as Measurement[]
        );

        return {
          type: key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
          value: Array.isArray(formattedData.values)
            ? formattedData.values.length
              ? formattedData.values.reduce((a, b) => a + b) /
                formattedData.values.length
              : 0
            : 0,
          isMeasured: Array.isArray(formattedData.values)
            ? formattedData.values.length > 0
            : formattedData.values.Low.length > 0 && formattedData.values.High.length > 0,
          status: formattedData.status,
          otherTypes: [],
          chartData: {
            dates: formattedData.dates,
            values: formattedData.values,
          },
        };
      });
    }) ?? [];

  return (
    <div className="flex justify-between o  w-full  bg-black-background gap-5 ">
      <div className="flex   flex-col gap-2 min-w-[312px] max-h-[700px] overflow-auto ">
        {btnInfo.map((item) => (
          <>
            <Accordion title={item.text}>
              <Appointments></Appointments>
            </Accordion>
          </>
        ))}
      </div>
      <InfoGraphicCenter />
      <div>
        <div className="flex flex-col gap-2 max-w-[300px] 2xl:max-w-[400px] max-h-[700px] overflow-auto">
          {chartData &&
            chartData.map((item, i) => (
              <div key={i}>
                <NormalChartCard
                  type={item.type}
                  // value={item.value}
                  isMeasured={item.isMeasured}
                  othersTypes={item.otherTypes}
                  status={item.status}
                  chartData={item.chartData}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OverView;
