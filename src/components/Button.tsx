import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z" clipRule="evenodd" />
          <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
        </svg>

        <span>Download CV</span>
        <div className="arrow-wrapper">
          <div className="arrow" />
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    --bg: #2563EB;
    --fg: #ffffff;
    --arrow-stroke: 2px;
    --arrow-width: 10px;

    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 0;
    border-radius: 10px;
    background: var(--bg);
    color: var(--fg);
    padding: 0.85em 1.8em;
    display: flex;
    align-items: center;
    gap: 0.65em;
    font-weight: bold;
    font-size: 1rem;
    letter-spacing: 0.01em;
    transition: color 0.45s ease;
  }

  /* Expanding blob */
  button::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: var(--fg);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
  }

  button:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }

  button:hover {
    color: var(--bg);
  }

  /* Keep svg, text & arrow above the blob */
  button svg,
  button span,
  button .arrow-wrapper {
    position: relative;
    z-index: 1;
  }

  /* Arrow */
  button .arrow-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    height: var(--arrow-stroke);
    background: currentColor;
    position: relative;
    transition: transform 0.2s ease;
  }

  button .arrow::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    border: solid currentColor;
    border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
    display: inline-block;
    padding: 3px;
    top: -3px;
    right: 3px;
    transform: rotate(-45deg);
    transition: right 0.2s ease;
  }

  button:hover .arrow::before {
    right: 0;
  }
`;

export default Button;