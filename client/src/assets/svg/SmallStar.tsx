import React from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  fill?: string;
};

export const SmallStar = React.memo<Props>(({ className = '', style = {}, fill = '#F2F2F2' }) => {
  return (
    <>
      <svg
        width="10"
        height="9"
        viewBox="0 0 10 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
      >
        <path
          d="M6.62437 2.75959L8.77512 2.97071C9.52348 3.04417 9.75299 3.79211 9.17511 4.2835L7.49132 5.71529L8.1164 8.04781C8.32168 8.81381 7.6848 9.27753 7.04691 8.81652L5.00099 7.33792L2.95506 8.81652C2.31975 9.27567 1.68027 8.81392 1.88558 8.04781L2.51066 5.71529L0.826864 4.2835C0.246562 3.79005 0.475172 3.0445 1.22674 2.97071L3.37709 2.75959L4.32448 0.524756C4.62117 -0.175106 5.38099 -0.174755 5.67742 0.524828L6.62437 2.75959Z"
          fill={fill}
        />
      </svg>
    </>
  );
});
