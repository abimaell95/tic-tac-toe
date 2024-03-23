import {useState} from 'react';




function Square({value, onSquareClick, isHighlighted}){
  
  if(isHighlighted){
    return <button className="square highlight" onClick={onSquareClick}>{value}</button>
  }
    return <button className="square" onClick={onSquareClick}>{value}</button>
 
}



export default function Board(){
  const [isXNext, setXIsNext] = useState(true);
  const [state, setState] = useState({winner:null, squares: Array(9).fill({value:null, isWinner:false})});
  
  function calculateWinner(squares, i) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const nextSquares = state.squares.slice()
    if(isXNext){
      nextSquares[i] = {...nextSquares[i], value:'X'};
    }else{
      nextSquares[i] = {...nextSquares[i], value:'O'};
    }



    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (nextSquares[a].value && nextSquares[a].value === nextSquares[b].value && nextSquares[a].value === nextSquares[c].value) {
        let winnerSquares = nextSquares.map((square, i)=>{
          if(i == a){
            return {...square, isWinner: true}
          }
          if(i == b){
            return {...square, isWinner: true}
          }
          if(i == c){
            return {...square, isWinner: true}
          }
          return square;
        })
        setState({...state, squares: winnerSquares, winner:  squares[a].value});
        return;
      }
    }
    
    setState({...state, squares: nextSquares}); 
    setXIsNext(!isXNext);
  }



  const handleClick = (i)=>{

    if(state.winner|| state.squares[i].value){
       return;
    }else{
      calculateWinner(state.squares, i);
    }
  }

  


  
  return(
    <>
    <div className="status">
      
      {state.winner &&  'Winner: ' + state.winner}
      {!state.winner && 'Next player: ' +  (isXNext ? 'X': 'O')}
      </div>
    <div className="board-row">
      <Square value={state.squares[0].value} onSquareClick={()=> handleClick(0)}  isHighlighted={state.squares[0].isWinner}></Square>
      <Square value={state.squares[1].value} onSquareClick={()=> handleClick(1)} isHighlighted={state.squares[1].isWinner}></Square>
      <Square value={state.squares[2].value} onSquareClick={()=> handleClick(2)} isHighlighted={state.squares[2].isWinner}></Square>
    </div>
    <div className="board-row">
      <Square value={state.squares[3].value} onSquareClick={()=> handleClick(3)} isHighlighted={state.squares[3].isWinner}></Square>
      <Square value={state.squares[4].value} onSquareClick={()=> handleClick(4)} isHighlighted={state.squares[4].isWinner}></Square>
      <Square value={state.squares[5].value} onSquareClick={()=> handleClick(5)} isHighlighted={state.squares[5].isWinner}></Square>
    </div>
    <div className="board-row">
      <Square value={state.squares[6].value} onSquareClick={()=> handleClick(6)} isHighlighted={state.squares[6].isWinner}></Square>
      <Square value={state.squares[7].value} onSquareClick={()=> handleClick(7)} isHighlighted={state.squares[7].isWinner}></Square>
      <Square value={state.squares[8].value} onSquareClick={()=> handleClick(8)} isHighlighted={state.squares[8].isWinner}></Square>
    </div>
    </>

  ) 
}


