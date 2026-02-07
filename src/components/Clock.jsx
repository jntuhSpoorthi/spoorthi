import Countdown from "react-countdown";

function Clock({ siteConfig }) {
  // Get values from siteConfig with fallbacks
  const countdownTarget = siteConfig?.countdownTarget || "2026-04-08T00:00:00";
  const currentYear = siteConfig?.currentYear || "2026";

  // Parse dates from siteConfig
  const startDate = siteConfig?.festDates?.startDate ? new Date(siteConfig.festDates.startDate) : new Date("2026-04-08");
  const endDate = siteConfig?.festDates?.endDate ? new Date(siteConfig.festDates.endDate) : new Date("2026-04-09");
  const month = startDate.toLocaleString('en-US', { month: 'long' });
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  // Helper to get ordinal suffix
  const getOrdinal = (n) => {
    const s = ["TH", "ST", "ND", "RD"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return (
    <div className="w-screen flex justify-center my-2 lg:mb-8">
      <div className="md:border border-gray/50 xl:mt-[8rem] pb-5 xl:pb-10 xl w-[100] xl:w-[35rem] flex flex-col justify-center items-center z-[10] text-white text-[3rem] md:text-[4rem] tracking-[1rem] font-clash">
        <Countdown
          date={new Date(countdownTarget)}
          className="text-[2rem] xl:text-[4rem]"
        />

        <div className="text-[.8rem] md:text-lg bottom-0 relative -tracking-tight">
          <span className="absolute left-[-9.5rem] md:left-[-13.5rem]">
            DAY
          </span>
          <span className="absolute left-[-4.5rem] md:left-[-7.5rem]">
            HOURS
          </span>
          <span className="absolute left-[.8rem] md:left-[.3rem]">MINUTES</span>
          <span className="absolute left-[6.5rem] md:left-[9rem]">SECONDS</span>
        </div>
      </div>

      <div className="hidden xl:block pl-4 border  min-w-min-[3rem] border-gray/50 p-3 mt-[8rem] text-white">
        <div className="flex flex-col gap-2 justify-center items-center h-[100%]">
          <span className="font-chakra text-[1.8rem]">
            {currentYear} <span className="font-clash">{month}</span>
          </span>
          <span className="flex gap-2 text-[2rem] font-chakra font-bold">
            {startDay}
            <b className="text-[12px]">{getOrdinal(startDay)}</b>
            {endDay}
            <b className="text-[12px]">{getOrdinal(endDay)}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Clock;
