import { ReactNode, useState, useRef } from 'react'
import './App.css'

function App() {
  const [gender, setGender] = useState<string>('boys');
  const [needsJersey, setNeedsJersey] = useState<boolean>(false);
  const [needsGear, setNeedsGear] = useState<boolean>(false);
  const [grade, setGrade] = useState<string>('k4');

  // Define fee constants
  const programFee = 25;
  const jerseyFee = 40;
  const boysGearRentalFee = 85;

  // Calculate fees based on selected options
  const programFeeTotal = gender === 'girls' || grade === 'k4' ? programFee : programFee + 30;
  const jerseyFeeTotal = needsJersey ? jerseyFee : 0;
  const gearRentalFeeTotal = gender === 'boys' && needsGear ? boysGearRentalFee : 0;
  const earlyRegistrationFeeTotal = grade === 'k4' ? 140 : 160
  const regularRegistrationFeeTotal = grade === 'k4' ? 150 : 170
  const lateRegistrationFeeTotal = grade === 'k4' ? 175 : 195

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
    <div className="calc-app">
      <h1 className="calc-header">Lacrosse Team Fee Calculator</h1>

      <div className="calc-wrapper">
        <div className="calc-options">
          <div>Gender:</div>
          <div className='calc-gender-wrapper'>
            <div>
              <input
                type="radio"
                id="radio-boys"
                value="boys"
                checked={gender === 'boys'}
                onChange={handleGenderChange}
                className='calc-hidden'
              />
              <label htmlFor="radio-boys" className="calc-radio-label">
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
                className='calc-hidden'
              />
              <label htmlFor='radio-girls' className="calc-radio-label">
                Girls
              </label>
            </div>
          </div>
          <div>Grade:</div>
          <div className='calc-grade-wrapper'>
            <div>
              <input
                type="radio"
                id='radio-k4'
                value="k4"
                checked={grade === 'k4'}
                onChange={handleGradeChange}
                className='calc-hidden'
              />
              <label htmlFor='radio-k4' className="calc-radio-label">
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
                className='calc-hidden'
              />
              <label htmlFor='radio-k8' className="calc-radio-label">
                5th-8th
              </label>
            </div>
          </div>
          <div>Need to buy a jersey?</div>
          <div>
            <label className="calc-checkbox-label">
              <input
                type="checkbox"
                checked={needsJersey}
                onChange={handleJerseyChange}
                className="calc-checkbox"
              />
              Yes
            </label>
          </div>
          <div>Need to rent gear? (Boys only)</div>
          <div>
            {( gender === 'boys' ? (
              <label className="calc-checkbox-label">
                <input
                  type="checkbox"
                  checked={needsGear}
                  onChange={handleGearChange}
                  className="calc-checkbox"
                />
                Yes
              </label>
            ) : (
              <div>N/A</div>
            )
            )}
          </div>
        </div>
      
        <div className="calc-data-wrapper">
          <h2 className="calc-fee-details-header">Fee Details</h2>
          <table className="calc-fee-table">
            <thead>
              <tr>
                <th className="calc-table-padding">Description</th>
                <th className="calc-table-padding">Early Reg Fee</th>
                <th className="calc-table-padding">Regular Reg Fee</th>
                <th className="calc-table-padding">Late Reg Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="calc-table-padding calc-table-first-column">
                  Program Fee - Payson
                  <Tooltip message={`Team and individual pictures,${grade === 'k8' && gender === 'boys' ? ' pre-season tournament,' : ''} team & program events, practice field space, team equipment, program administration`}>
                  ⓘ
                  </Tooltip>
                </td>
                <td className="calc-table-padding calc-text-right">${programFeeTotal}</td>
                <td className="calc-table-padding calc-text-right">${programFeeTotal}</td>
                <td className="calc-table-padding calc-text-right">${programFeeTotal}</td>
              </tr>
              <tr>
                <td className="calc-table-padding calc-table-first-column">
                  Registration Fee - IMLAX
                  <Tooltip message="Fee changes based on when you register; covers league administration, refs, USLacrosse Membership for each player, insurance, team balls, field set up, score keepers, etc">
                    ⓘ
                  </Tooltip>
                </td>
                <td className="calc-table-padding calc-text-right">${earlyRegistrationFeeTotal}</td>
                <td className="calc-table-padding calc-text-right">${regularRegistrationFeeTotal}</td>
                <td className="calc-table-padding calc-text-right">${lateRegistrationFeeTotal}</td>
              </tr>
              <tr>
                <td className="calc-table-padding calc-table-first-column">
                  Jersey Fee
                  <Tooltip message="All players need a Payson Youth Lacrosse jersey, but do not need to purchase a new jersey for each season. If you have a jersey from a prior season that still fits and is in acceptable condition, you can definitely use it again. These fees are paid directly to PYL">
                    ⓘ
                  </Tooltip>
                </td>
                <td className="calc-table-padding calc-text-right">${jerseyFeeTotal}</td>
                <td className="calc-table-padding calc-text-right">${jerseyFeeTotal}</td>
                <td className="calc-table-padding calc-text-right">${jerseyFeeTotal}</td>
              </tr>
              <tr>
                <td className="calc-table-padding calc-table-first-column">
                  Gear Rental Fee
                  <Tooltip message="BOYS ONLY; covers the full protective gear set. Gear rental is thru Storm Lacrosse in AF, but the fee is collected and paid thru IMLax during registration. Not needed if you own your own gear">
                    ⓘ
                  </Tooltip>
                </td>
                <td className="calc-table-padding calc-text-right">{gender === 'boys' ? `$${gearRentalFeeTotal}` : 'N/A'}</td>
                <td className="calc-table-padding calc-text-right">{gender === 'boys' ? `$${gearRentalFeeTotal}` : 'N/A'}</td>
                <td className="calc-table-padding calc-text-right">{gender === 'boys' ? `$${gearRentalFeeTotal}` : 'N/A'}</td>
              </tr>
              <tr className="calc-total-row">
                <td className="calc-table-padding font-semibold">Total</td>
                <td className="calc-table-padding font-semibold calc-text-right">${totalEarlyFee}</td>
                <td className="calc-table-padding font-semibold calc-text-right">${totalRegularFee}</td>
                <td className="calc-table-padding font-semibold calc-text-right">${totalLateFee}</td>
              </tr>
            </tbody>
          </table>
          <div className="calc-mobile-cards-wrapper">
            <ExpandableCard
              title="Early Registration Fee"
              gender={gender}
              registrationFee={earlyRegistrationFeeTotal}
              totalFee={totalEarlyFee}
              programFee={programFeeTotal}
              jerseyFee={jerseyFeeTotal}
              gearRentalFee={gearRentalFeeTotal}
              grade={grade}
            />
            <ExpandableCard
              title="Regular Registration Fee"
              gender={gender}
              registrationFee={regularRegistrationFeeTotal}
              totalFee={totalRegularFee}
              programFee={programFeeTotal}
              jerseyFee={jerseyFeeTotal}
              gearRentalFee={gearRentalFeeTotal}
              grade={grade}
            />
            <ExpandableCard
              title="Late Registration Fee"
              gender={gender}
              registrationFee={lateRegistrationFeeTotal}
              totalFee={totalLateFee}
              programFee={programFeeTotal}
              jerseyFee={jerseyFeeTotal}
              gearRentalFee={gearRentalFeeTotal}
              grade={grade}
            />
          </div>
        </div>
      </div>
      <a href="https://www.paysonyouthlacrosse.com/financial-assistance" target='_blank' rel='noreferrer'>
        <div className="calc-link">For finanacial assistance options, click here</div>
      </a>
    </div>
  );
}

export default App

interface ExpandableCardProps {
  title: string;
  gender: string;
  registrationFee: number;
  totalFee: number;
  programFee: number;
  jerseyFee: number;
  gearRentalFee: number;
  grade: string;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, gender, registrationFee, totalFee, programFee, jerseyFee, gearRentalFee, grade }) => {
  return (
    <div className="calc-card">
      <div className="calc-card-header">
        <h2 className="calc-card-header-title">{title}</h2>
      </div>
      <div className="calc-card-details-wrapper">
        <table className="calc-card-table">
          <thead>
            <tr>
              <th className="calc-card-table-padding">Description</th>
              <th className="calc-card-table-padding">Fee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="calc-card-table-padding calc-table-first-column">
                Program Fee - PYL
                <Tooltip message={`Team and individual pictures,${grade === 'k8' && gender === 'boys' ? ' pre-season tournament,' : ''} team & program events, practice field space, team equipment, program administration`}>
                ⓘ
                </Tooltip>
              </td>
              <td className="calc-card-table-padding calc-text-right">${programFee}</td>
            </tr>
            <tr>
              <td className="calc-card-table-padding calc-table-first-column">
                Registration Fee - IMLAX
                <Tooltip message="Fee changes based on when you register; covers league administration, refs, USLacrosse Membership for each player, insurance, team balls, field set up, score keepers, etc">
                  ⓘ
                </Tooltip>
              </td>
              <td className="calc-card-table-padding calc-text-right">${registrationFee}</td>
            </tr>
            <tr>
              <td className="calc-card-table-padding calc-table-first-column">
                Jersey Fee
                <Tooltip message="All players need a Payson Youth Lacrosse jersey, but do not need to purchase a new jersey for each season. If you have a jersey from a prior season that still fits and is in acceptable condition, you can definitely use it again. These fees are paid directly to PYL">
                  ⓘ
                </Tooltip>
              </td>
              <td className="calc-card-table-padding calc-text-right">${jerseyFee}</td>
            </tr>
            <tr>
              <td className="calc-card-table-padding calc-table-first-column">
                Gear Rental Fee
                <Tooltip message="BOYS ONLY; covers the full protective gear set. Gear rental is thru Storm Lacrosse in AF, but the fee is collected and paid thru IMLax during registration. Not needed if you own your own gear">
                  ⓘ
                </Tooltip>
              </td>
              <td className="calc-card-table-padding calc-text-right">{gender === 'boys' ? `$${gearRentalFee}` : 'N/A'}</td>
            </tr>
            <tr className="calc-total-row">
              <td className="calc-card-table-padding font-semibold">Total</td>
              <td className="calc-card-table-padding font-semibold calc-text-right">${totalFee}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface TooltipProps {
  message: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 50 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLDivElement>(null);

  const showTooltip = (): void => {
    if (childRef.current && tooltipRef.current) {
      const childBox = childRef.current.getBoundingClientRect();
      const tooltipBox = tooltipRef.current.getBoundingClientRect();

      // Adjust the position based on the tooltip size and child element location
      let top = 30; // Default position below the element
      let left = 0; // Default position centered

      // Check if tooltip exceeds the bottom of the viewport
      if (childBox.bottom + tooltipBox.height > window.innerHeight) {
        top = -100;
      }

      // Check if tooltip exceeds the right of the viewport
      if (childBox.left + tooltipBox.width / 2 > window.innerWidth) {
        left = 100 - ((childBox.right / window.innerWidth) * 100);
      }

      // Check if tooltip exceeds the left of the viewport
      if (childBox.left - tooltipBox.width / 2 < 0) {
        left = (childBox.left / window.innerWidth) * 100;
      }

      setPosition({ top, left });

      setIsVisible(true);
    }
  };

  const hideTooltip = (): void => {
    setIsVisible(false);
  };

  return (
    <div className="calc-tooltip-container" ref={childRef}>
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onTouchStart={showTooltip}
        onTouchEnd={hideTooltip}
        onTouchMove={hideTooltip}
      >
        {children}
      </div>
      <div
        className={`calc-tooltip-box ${isVisible ? 'visible' : ''}`}
        ref={tooltipRef}
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        {message}
      </div>
    </div>
  );
};