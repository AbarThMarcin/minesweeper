const Score = ({ score }) => {
   return <div className="score scoreTimer">{('00' + score).slice(-3)}</div>
}

export default Score
