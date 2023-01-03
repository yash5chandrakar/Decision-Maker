import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState("Title")
  const [pros, setPros] = useState([])
  const [cons, setCons] = useState([])

  const [proArg, setProArg] = useState("")
  const [conArg, setConArg] = useState("")

  const [proWeight, setProWeight] = useState("")
  const [conWeight, setConWeight] = useState("")

  const [progress, setProgress] = useState(0)

  function handleCons() {
    if (conArg !== "" && conWeight !== "" && conWeight < 11 && conWeight > 0) {
      let myCons = JSON.parse(JSON.stringify(cons))
      let obj = {
        id: new Date().getTime(),
        title: conArg,
        value: conWeight
      }
      setConArg("")
      setConWeight("")
      setCons([...myCons, obj])
    }
    else {
      if (conWeight > 10 || conWeight < 0) {
        alert("Weightage can only be between 1 and 10")
      }
      else {
        alert("Fields Cannot be left Blank! ")
      }
    }
  }

  function handlePros() {
    if (proArg !== "" && proWeight !== "" && proWeight < 11 && proWeight > 0) {
      let myPros = JSON.parse(JSON.stringify(pros))
      let obj = {
        id: new Date().getTime(),
        title: proArg,
        value: proWeight
      }
      setProArg("")
      setProWeight("")
      setPros([...myPros, obj])
    }
    else {
      if (proWeight > 10 || proWeight < 0) {
        alert("Weightage can only be between 1 and 10")
      }
      else {
        alert("Fields Cannot be left Blank! ")
      }
    }
  }

  function deleteCons(itemId) {
    let newCons = cons.filter((item) => item.id !== itemId)
    setCons(newCons)
  }

  function deletePros(itemId) {
    // console.log("Hello")
    let newPros = pros.filter((item) => item.id !== itemId)
    setPros(newPros)
  }

  function handleTitleEdit() {
    let newTitle = prompt("Enter New Title")
    setTitle(newTitle)
  }

  useEffect(() => {
    let percentValue = 0;

    if (pros.length !== 0 && cons.length !== 0) {
      let proValue = getTrueValue(pros)
      let conValue = getTrueValue(cons)
      // console.log(proValue)
      // console.log(conValue)
      percentValue = ((proValue / (proValue + conValue)) * 100).toFixed(2)
      // console.log(proValue)
    }
    else {
      if (pros.length === 0 && cons.length === 0) {
        percentValue = 0.00;
      }
      else if (pros.length === 0) {
        percentValue = 0.00;
      }
      else {
        percentValue = 100
      }
    }
    setProgress(percentValue)
  }, [pros, cons])

  function getTrueValue(arr) {
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
      num += parseFloat(arr[i].value);
    }
    return num
  }

  return (
    <div className='outerDiv'>
      <div className='innerDiv'>
        <h1 className='mainTitle'>Decision Maker </h1>
        <p className='author'>- Made By Yash Kumar Chandrakar</p>
        <div>
          <div className='title'><h2>{title}</h2><button onClick={() => handleTitleEdit()}>Edit Title</button>

          </div>
          <div className='innerContent'>
            <div className='progressBar'>
              <div className='progressDone' style={{
                width: `${(progress === 0) ? 4 : progress}%`,
                color: (progress < 20) ? "rgb(234, 82, 82)" : (progress > 80) ? "rgb(0, 150, 6)" : "yellow"
              }}>
                {progress}%
              </div>
            </div>
            <div className='contentBox'>
              <div className='pros'>
                <h2>PROS</h2>
                <ul>
                  {pros && pros.map((item) =>
                    <li className='listItem' key={item.id}> <span>&nbsp;{item.title} &nbsp;</span> <span className='ratings'>{item.value}</span> &nbsp; <button className='deleteBtn' onClick={() => deletePros(item.id)} >X</button></li>
                  )}
                  <li className='listItem'>
                    <input value={proArg} onChange={(e) => setProArg(e.target.value)} className='argumentText' type={'text'} placeholder="New Argument"></input> &nbsp; <input className='weightText' onChange={(e) => setProWeight(e.target.value)} min="1" max="10" value={proWeight} type={'number'} placeholder="Weight"></input> &nbsp; <button className='addBtn' onClick={() => handlePros()}>ADD</button>
                  </li>
                </ul>
              </div>
              <div className='cons'>
                <h2>CONS</h2>
                <ul>
                  {cons && cons.map((item) =>
                    <li className='listItem' key={item.id}> <span>&nbsp;{item.title} &nbsp;</span> <span className='ratings'>{item.value}</span> &nbsp; <button className='deleteBtn' onClick={() => deleteCons(item.id)}>X</button></li>
                  )}
                  <li className='listItem'>
                    <input value={conArg} onChange={(e) => setConArg(e.target.value)} className='argumentText' type={'text'} placeholder="New Argument"></input> &nbsp; <input className='weightText' onChange={(e) => setConWeight(e.target.value)} min="1" max="10" value={conWeight} type={'number'} placeholder="Weight"></input> &nbsp; <button className='addBtn' onClick={() => handleCons()}>ADD</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
