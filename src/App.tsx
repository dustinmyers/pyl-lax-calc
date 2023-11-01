import { ReactNode, useState } from 'react'
import './App.css'

function App() {
  const [gender, setGender] = useState<string>('boys');
  const [needsJersey, setNeedsJersey] = useState<boolean>(false);
  const [needsGear, setNeedsGear] = useState<boolean>(false);
  const [grade, setGrade] = useState<string>('k4');

  // Define fee constants
  const programFee = 20;
  const jerseyFee = 40;
  const boysGearRentalFee = 85;

  // Calculate fees based on selected options
  const programFeeTotal = programFee;
  const jerseyFeeTotal = needsJersey ? jerseyFee : 0;
  const gearRentalFeeTotal = gender === 'boys' && needsGear ? boysGearRentalFee : 0;
  const earlyRegistrationFeeTotal = grade === 'k4' ? 70 : 90
  const regularRegistrationFeeTotal = grade === 'k4' ? 85 : 105
  const lateRegistrationFeeTotal = grade === 'k4' ? 105 : 125

  const totalEarlyFee = programFeeTotal + jerseyFeeTotal + gearRentalFeeTotal + earlyRegistrationFeeTotal;
  const totalRegularFee = programFeeTotal + jerseyFeeTotal + gearRentalFeeTotal + regularRegistrationFeeTotal;
  const totalLateFee = programFeeTotal + jerseyFeeTotal + gearRentalFeeTotal + lateRegistrationFeeTotal;

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGender(e.target.value);
  };
  
  const handleJerseyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsJersey(e.target.checked);
  };
  
  const handleGearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNeedsGear(e.target.checked);
  };
  
  const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGrade(e.target.value);
  };

  return (
    <div className="app container mx-auto py-6 w-full">
      <h1 className="text-2xl md:text-4xl font-semibold mb-8 text-center">Lacrosse Team Fee Calculator</h1>

      <div className="grid grid-cols-1 gap-20 items-start w-full">
        <div className="grid grid-cols-2 gap-4 justify-items-start">
          <div>Gender:</div>
          <div className='flex items-start gap-4 w-full'>
            <div>
              <input
                type="radio"
                id="radio-boys"
                value="boys"
                checked={gender === 'boys'}
                onChange={handleGenderChange}
                className='hidden'
              />
              <label htmlFor="radio-boys" className="inline-flex items-center p-4 border-2 border-gray-400 cursor-pointer">
                Boys
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="radio-girls"
                value="girls"
                checked={gender === 'girls'}
                onChange={handleGenderChange}
                className='hidden'
              />
              <label htmlFor='radio-girls' className="inline-flex items-center p-4 border-2 border-gray-400 cursor-pointer">
                Girls
              </label>
            </div>
          </div>
          <div>Grade:</div>
          <div className='flex items-start gap-4 w-full'>
            <div>
              <input
                type="radio"
                id='radio-k4'
                value="k4"
                checked={grade === 'k4'}
                onChange={handleGradeChange}
                className='hidden'
              />
              <label htmlFor='radio-k4' className="inline-flex items-center p-4 border-2 border-gray-400 cursor-pointer">
                K-4th
              </label>
            </div>
            <div>
              <input
                type="radio"
                id='radio-k8'
                value="k8"
                checked={grade === 'k8'}
                onChange={handleGradeChange}
                className='hidden'
              />
              <label htmlFor='radio-k8' className="inline-flex items-center p-4 border-2 border-gray-400 cursor-pointer">
                5th-8th
              </label>
            </div>
          </div>
          <div>Need to buy a jersey?</div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={needsJersey}
                onChange={handleJerseyChange}
                className="border-gray-300 rounded h-5 w-5 mr-2  accent-green-500"
              />
              Yes
            </label>
          </div>
          <div>Need to rent gear? (Boys only)</div>
          <div>
            {( gender === 'boys' ? (
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={needsGear}
                  onChange={handleGearChange}
                  className="border-gray-300 rounded h-5 w-5 mr-2 accent-green-500"
                />
                Yes
              </label>
            ) : (
              <div>N/A</div>
            )
            )}
          </div>
        </div>
      
        <div className="container mx-auto text-left">
          <h2 className="text-xl font-semibold mb-2">Fee Details</h2>
          <table className="table-auto w-full hidden md:block">
            <thead>
              <tr>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Early Reg Fee</th>
                <th className="px-4 py-2">Regular Reg Fee</th>
                <th className="px-4 py-2">Late Reg Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 flex gap-2">
                  Program Fee - Payson Youth Lacrosse
                  <Tooltip message="Team & program events, practice field space, team equipment, program administration">
                  ⓘ
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-right">${programFeeTotal}</td>
                <td className="px-4 py-2 text-right">${programFeeTotal}</td>
                <td className="px-4 py-2 text-right">${programFeeTotal}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 flex gap-2">
                  Registration Fee - IMLAX
                  <Tooltip message="Fee changes based on when you register; covers league administration, refs, USLacrosse Membership for each player, insurance, team balls, field set up, score keepers, etc">
                    ⓘ
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-right">${earlyRegistrationFeeTotal}</td>
                <td className="px-4 py-2 text-right">${regularRegistrationFeeTotal}</td>
                <td className="px-4 py-2 text-right">${lateRegistrationFeeTotal}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 flex gap-2">
                  Jersey Fee
                  <Tooltip message="All players need a Payson Youth Lacrosse jersey, but do not need to purchase a new jersey for each season. If you have a jersey from a prior season that still fits and is in acceptable condition, you can definitely use it again. These fees are paid directly to PYL">
                    ⓘ
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-right">${jerseyFeeTotal}</td>
                <td className="px-4 py-2 text-right">${jerseyFeeTotal}</td>
                <td className="px-4 py-2 text-right">${jerseyFeeTotal}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 flex gap-2">
                  Gear Rental Fee
                  <Tooltip message="BOYS ONLY; covers the full protective gear set. Gear rental is thru Storm Lacrosse in AF, but the fee is collected and paid thru IMLax during registration. Not needed if you own your own gear">
                    ⓘ
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-right">{gender === 'boys' ? `$${gearRentalFeeTotal}` : 'N/A'}</td>
                <td className="px-4 py-2 text-right">{gender === 'boys' ? `$${gearRentalFeeTotal}` : 'N/A'}</td>
                <td className="px-4 py-2 text-right">{gender === 'boys' ? `$${gearRentalFeeTotal}` : 'N/A'}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 font-semibold">Total</td>
                <td className="px-4 py-2 font-semibold text-right">${totalEarlyFee}</td>
                <td className="px-4 py-2 font-semibold text-right">${totalRegularFee}</td>
                <td className="px-4 py-2 font-semibold text-right">${totalLateFee}</td>
              </tr>
            </tbody>
          </table>
          <div className="md:hidden">
            <ExpandableCard
              title="Early Registration Fee"
              gender={gender}
              registrationFee={earlyRegistrationFeeTotal}
              totalFee={totalEarlyFee}
            />
            <ExpandableCard
              title="Regular Registration Fee"
              gender={gender}
              registrationFee={regularRegistrationFeeTotal}
              totalFee={totalRegularFee}
            />
            <ExpandableCard
              title="Late Registration Fee"
              gender={gender}
              registrationFee={lateRegistrationFeeTotal}
              totalFee={totalLateFee}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

interface ExpandableCardProps {
  title: string;
  gender: string;
  registrationFee: number;
  totalFee: number;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, gender, registrationFee, totalFee }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-4 my-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={toggleExpansion} className="text-blue-500">
          {expanded ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
      {expanded && (
        <div className="mt-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 flex gap-2">
                  Program Fee - Payson Youth Lacrosse
                  <Tooltip message="Team & program events, practice field space, team equipment, program administration">
                  ⓘ
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-right">$20</td>
              </tr>
              <tr>
                <td className="px-4 py-2 flex gap-2">
                  Registration Fee - IMLAX
                  <Tooltip message="Fee changes based on when you register; covers league administration, refs, USLacrosse Membership for each player, insurance, team balls, field set up, score keepers, etc">
                    ⓘ
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-right">${registrationFee}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 flex gap-2">
                  Jersey Fee
                  <Tooltip message="All players need a Payson Youth Lacrosse jersey, but do not need to purchase a new jersey for each season. If you have a jersey from a prior season that still fits and is in acceptable condition, you can definitely use it again. These fees are paid directly to PYL">
                    ⓘ
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-right">$40</td>
              </tr>
              <tr>
                <td className="px-4 py-2 flex gap-2">
                  Gear Rental Fee
                  <Tooltip message="BOYS ONLY; covers the full protective gear set. Gear rental is thru Storm Lacrosse in AF, but the fee is collected and paid thru IMLax during registration. Not needed if you own your own gear">
                    ⓘ
                  </Tooltip>
                </td>
                <td className="px-4 py-2 text-right">{gender === 'boys' ? "$85" : 'N/A'}</td>
              </tr>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 font-semibold">Total</td>
                <td className="px-4 py-2 font-semibold text-right">${totalFee}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

interface TooltipProps {
  message: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  return (
    <div className="group relative flex cursor-help">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded w-60 bg-gray-800 p-2 text-sm text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  );
};