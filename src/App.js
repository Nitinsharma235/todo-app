import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  function handleCancel() {
    console.log("Button clicked!");
    const input = document.getElementById("taskinput");
    input.value = null;
  }
  function handleSave() {  
    const input = document.getElementById("taskinput");
    const inputValue = input.value;

    if(!inputValue){
      return;
    }
    console.log(inputValue);
    console.log("Button clicked!");
    var newArray =tasks.slice();    
    newArray.push(inputValue);   
    setTasks(newArray);
  }
  function handleDelete(i){
    var newArray =tasks.slice();
    newArray.splice(i,1);
    setTasks(newArray);  

  }
  
  return (
    <div>
    <div className="backgroundColor">.</div>
    <div className="centerNew">
    <h1 className="title">ToDo App</h1>
    <br/><br/> 
      <ol class="list-group">
        { tasks.map((task,index) => <li><input type='checkbox' id='task{index}'/>{task} &nbsp;&nbsp;&nbsp;<button onClick={() => handleDelete(index)} class="closebutton">X</button></li>)}
      </ol>
      {/* <button onClick={handleAdd}>Add task</button> */}
      <br/>
      <div className="input"> 
      <input type="text" placeholder="Enter here" id="taskinput"/>
      <br/>
      <button className='button-4' onClick={handleCancel}>Cancel</button>
      <button className='button-3' onClick={handleSave}>Save</button>
      </div>
    </div>
    </div>
  );
}
export default App;
