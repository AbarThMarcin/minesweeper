const BombsLeft = ({ bombsLeft }) => {
   return <div className="bombsLeft bombsLeftTimer">{('00' + bombsLeft).slice(-3)}</div>
}

export default BombsLeft
