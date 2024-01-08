import React from 'react';

const Flashcard = ({ word, toggleLanguage }) => {
  return (
    <div className="flashcard" onClick={toggleLanguage}>
      {word}
    </div>
  );
};
  
export default Flashcard;
