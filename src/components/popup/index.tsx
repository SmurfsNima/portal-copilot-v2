import { useState } from "react";

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}
interface ConcerningResult {
  Name: string;
  Result: number;
  Unit: string;
  LRR: string;
  OR: string;
  Baseline: number;
  Cahnge: number;
}

const PopUp = ({ isOpen, onClose }: PopUpProps) => {
  if (!isOpen) return null;
  const [sortConfig, setSortConfig] = useState<{ key: keyof ConcerningResult; direction: 'asc' | 'desc' }>({ key: 'Name', direction: 'asc' });


  const ConcerningResults: ConcerningResult[] = [    {
      Name:'Coronary Calcium Score Percentile',
      Result:78,
      Unit:'%',
      LRR:'',
      OR:'1-20',
      Baseline:78,
      Cahnge:0
    },
    {
      Name:'Free Testosterone %',
      Result:2.1,
      Unit:'%',
      LRR:'0.8 - 1.4',
      OR:'',
      Baseline:1.000,
      Cahnge:110
    },
    {
      Name:'Free Estradiol',
      Result:1,
      Unit:'pg/mL',
      LRR:'6 - 54.7',
      OR:'',
      Baseline:0,
      Cahnge: -87
    },
    {
      Name:'Progesterone',
      Result:10,
      Unit:'ng/dL',
      LRR:'0 - 0.1',
      OR:'1000.0- 3000.0',
      Baseline:80.0,
      Cahnge:-31
    },
    {
      Name:'Insulin-Like Growth Factor 1',
      Result:128,
      Unit:'ng/mL',
      LRR:'41 - 168',
      OR:'250-450',
      Baseline:0,
      Cahnge:0
    },
    {
      Name:'Zinc in Serum',
      Result:66,
      Unit:'µg/dL',
      LRR:'44 - 115',
      OR:'96.00-115.00',
      Baseline:0,
      Cahnge:0
    },
    {
      Name:'Magnesium in Red Blood Cells',
      Result:4.1,
      Unit:'mg/dL',
      LRR:'4.2 - 6.8',
      OR:'',
      Baseline:21.000,
      Cahnge:48
    },
    {
      Name:'Gamma-Glutamyl Transferase',
      Result:31,
      Unit:'IU/L',
      LRR:'3 - 70',
      OR:'<10',
      Baseline:0,
      Cahnge:0
    }
  ]

  const sortedResults = [...ConcerningResults].sort((a, b) => {
    if (sortConfig.key === 'Name') return 0; 
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof ConcerningResult) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-[1000]">
      <div className="bg-[#272727] p-5 rounded-md w-[85%] max-w-[90%] relative flex items-center justify-center flex-col text-white text-sm">
        <div className="w-full flex items-center justify-between px-4 mb-[10px]">
          <p>Concerning Results</p>
          <button onClick={onClose} className="text-[1.5rem] cursor-pointer">✕</button>
        </div>
        <div className="w-full px-4 flex items-center justify-center">
          <table className="w-full text-left text-xs text-white/70">
          <thead>
              <tr className="h-[30px]">
                <th>Name</th>
                <th onClick={() => handleSort('Result')} style={{ cursor: 'pointer' }}>
                  Result
                  <span style={{ marginLeft: '0.5rem' }}>
                    ⇅
                  </span>
                </th>
                <th onClick={() => handleSort('Unit')} style={{ cursor: 'pointer' }}>
                  Unit
                  <span style={{ marginLeft: '0.5rem' }}>
                    ⇅
                  </span>
                </th>
                <th onClick={() => handleSort('LRR')} style={{ cursor: 'pointer' }}>
                  Lab Ref Range
                  <span style={{ marginLeft: '0.5rem' }}>
                    ⇅
                  </span>
                </th>
                <th onClick={() => handleSort('OR')} style={{ cursor: 'pointer' }}>
                  Optimal Range
                  <span style={{ marginLeft: '0.5rem' }}>
                    ⇅
                  </span>
                </th>
                <th onClick={() => handleSort('Baseline')} style={{ cursor: 'pointer' }}>
                  Baseline
                  <span style={{ marginLeft: '0.5rem' }}>
                    ⇅
                  </span>
                </th>
                <th onClick={() => handleSort('Cahnge')} style={{ cursor: 'pointer' }}>
                  Change
                  <span style={{ marginLeft: '0.5rem' }}>
                    ⇅
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedResults.map((concerning, index) => (
                <tr key={index} className="h-[30px]">
                  <td>{concerning.Name}</td>
                  <td>{concerning.Result}</td>
                  <td>{concerning.Unit}</td>
                  <td>{concerning.LRR}</td>
                  <td>{concerning.OR}</td>
                  <td>{concerning.Baseline}</td>
                  <td>{concerning.Cahnge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PopUp;