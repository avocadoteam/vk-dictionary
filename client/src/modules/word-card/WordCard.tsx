import { getSelectedCardData } from 'core/selectors/word';
import React from 'react';
import { useSelector } from 'react-redux';

export const WordCard = React.memo(() => {
  const data = useSelector(getSelectedCardData);
  console.log(data);
  return <div>kek</div>;
});
