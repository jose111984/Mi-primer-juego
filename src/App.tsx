import { useEffect, useState } from 'react';
import { HangImage } from './components/Hanglmage';
import { letters } from './helpers/letters';

import './App.css'
import { getRandomWord } from './helpers/getRandomWord';

function App() {

  const [word, setWord] = useState ( getRandomWord);
  const [hiddenWord , setHiddenWord] = useState( '_ '.repeat(word.length));
  const [ attemps , setAttempts] =useState(0)
  const [lose, setLose]= useState (false);
  const [won, setWon]= useState (false);

  // Determinar si la persona perdió
  useEffect( () =>{
    if ( attemps >=9 ){
      setLose(true);
      
    }

  }, [attemps])//hooks

  // Determinar si la persona ganó
  useEffect( () =>{
    console.log(hiddenWord);
    const currentHiddenWord = hiddenWord.split (' ').join('');
    if (currentHiddenWord === word) {
      setWon (true);

    }
  }, [hiddenWord])
    
  const checkLetter = (letter: string) =>{
    if ( lose ) return;
    if ( won ) return;
    
    if (!word.includes(letter)){
      setAttempts (Math.min (attemps + 1, 9));
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');
    console.log(hiddenWordArray);
    
    for(let i=0; i < word.length; i++){
      if (word[i]=== letter){
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));
  } 



  const newGame = () => {
    const newWord = getRandomWord ();

    setWord( newWord);
    setHiddenWord( '_ '.repeat(newWord.length));
    setAttempts(0);
    setLose(false);
    setWon(false);
  }


  return (
     <div className="App">
      
      {/* Imágenes*/}
      <HangImage imageNumber={ attemps }/>
      {/* Palabra oculta*/}
      <h3>{ hiddenWord }</h3>

      {/* Contador de intentos*/}
      <h3>Intentos:  {attemps}</h3>

      {/* Mensaje si perdió*/}
    {
        (lose)
        ? <h2>Perdió su palabra era { word }</h2>: ''
    }

     {/* Mensaje si ganó*/}
     {
        (won)
        ? <h2>Felicidades, usted ganó { word }</h2>
        : ''
    }
      {/* Botones de letras*/}
      {
        letters.map ((letter)=>(
          <button 
            onClick={() =>checkLetter(letter)}
            key={letter}>
            {letter}
          </button>
        ))

        
      }

      <br /><br />
      <button onClick={newGame}>¿Nuevo juego?</button>

      </div>   
  )
}

export default App
