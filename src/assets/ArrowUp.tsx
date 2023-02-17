const ArrowUp = () => {
  return (
    <div className="h-5 md:h-7 w-5 md:w-7 flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-arrow-narrow-up"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="#363A3F"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="16" y1="9" x2="12" y2="5" />
        <line x1="8" y1="9" x2="12" y2="5" />
      </svg>
    </div>
  );
};

export default ArrowUp;
