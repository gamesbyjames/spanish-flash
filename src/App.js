import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard';
import './App.css';

const App = () => {
  const [words, setWords] = useState({ german: [], spanish: [] });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('german');
  //const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    if (currentTopic) {
      fetch(`./data/${currentTopic}.json`)
        .then(res => res.json())
        .then(data => {
          setWords({ german: data.german || [], spanish: data.spanish || [] });
          setCurrentIndex(0);
        })
        .catch(err => console.error("Fetching error:", err));
    }
  }, [currentTopic]);

  const toggleLanguage = () => {
    setCurrentLanguage(lang => lang === 'german' ? 'spanish' : 'german');
  };

  const selectTopic = (topic) => {
    setCurrentTopic(topic);
    setCurrentLanguage('german'); // Set language to German
  };

  const goToNextWord = () => {
    setCurrentIndex(currentIndex => (currentIndex + 1) % words[currentLanguage].length);
    setCurrentLanguage('german'); // Set language to German
  };
  
  const goToPreviousWord = () => {
    setCurrentIndex(currentIndex => (currentIndex - 1 + words[currentLanguage].length) % words[currentLanguage].length);
    setCurrentLanguage('german'); // Set language to German
  };
  

  return (
    <div className="app">
      {!currentTopic ? (
        <div>
          <button onClick={() => selectTopic('weather')}>Weather</button>
          <button onClick={() => selectTopic('introductions')}>Introductions</button>
          <button onClick={() => selectTopic('hobbies')}>Hobbies</button>
          <button onClick={() => selectTopic('times_and_dates')}>Times and Dates</button>
          <button onClick={() => selectTopic('travelling_holidays')}>Travelling / Holidays</button>
          <button onClick={() => selectTopic('other')}>Other</button>
          <button onClick={() => selectTopic('more')}>More</button>
        </div>
      ) : (
        <div>
          {words[currentLanguage] && words[currentLanguage].length > 0 && (
  <Flashcard 
    word={words[currentLanguage][currentIndex % words[currentLanguage].length]} 
    toggleLanguage={toggleLanguage} 
  />
)}
          <button onClick={goToPreviousWord}>Previous</button>
          <button onClick={goToNextWord}>Next</button>
          <button onClick={() => setCurrentTopic(null)}>Change Topic</button>
        </div>
      )}
    </div>
  );
}

export default App;



/*import React, { useState, useEffect } from 'react';
import Flashcard from './components/Flashcard'; // Adjust if necessary
import './App.css';

function App() {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState('german01'); // Initial language

  useEffect(() => {
    fetch(`./data/${language}.txt`)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n').filter(Boolean);
        const wordObjects = lines.map(line => ({
          word: line.trim(),
          language: language.replace(/\d+\.txt$/, '') // Assuming the language is the file name without numbers and .txt
        }));
        setWords(wordObjects);
        // No resetting of currentIndex here
      })
      .catch(err => console.error("Fetching error:", err));
  }, [language]);

  const goToNextWord = () => {
    setCurrentIndex(currentIndex => (currentIndex + 1) % words.length);
    setLanguage('german01'); // Set language to German
  };

  const goToPreviousWord = () => {
    setCurrentIndex(currentIndex => (currentIndex - 1 + words.length) % words.length);
    setLanguage('german01'); // Set language to German
  };

  // Change language and maintain the current index
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    // The index will be adjusted after new words are fetched
  };

  return (
    <div className="app">
      <button onClick={() => changeLanguage('german01')}>German</button>
      <button onClick={() => changeLanguage('spanish01')}>Spanish</button>
      {words.length > 0 ? (
        <div>
          <Flashcard word={words[currentIndex % words.length]} />
          <button onClick={goToPreviousWord}>Previous</button>
          <button onClick={goToNextWord}>Next</button>
        </div>
      ) : (
        <p>Loading words...</p>
      )}
    </div>
  );
}

export default App;*/
