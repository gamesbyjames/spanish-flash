import React from 'react';
import Flashcard from './Flashcard';

function FlashcardList({ words }) {
  return (
    <div className="flashcard-list">
      {words.map((word, index) => (
        <Flashcard key={index} word={word} />
      ))}
    </div>
  );
}

export default FlashcardList;
