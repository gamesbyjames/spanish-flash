import React from 'react';

function Flashcard({ word }) {
    return (
      <div className="flashcard">
        {word.word} {/* Accessing the 'word' property of the object */}
      </div>
    );
  }
  
export default Flashcard;
