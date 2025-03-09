import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  function handleCancel() {
    console.log("Button clicked!");
    const input = document.getElementById("taskinput");
    input.value = null;
    const dinput=document.getElementById("dateinput");
    dinput.value=null;
    
  }
  function handleSave() {  
    const input=document.getElementById("taskinput");
    const inputvalue=input.value;
    
    const dinput=document.getElementById("dateinput");
    const dinputvalue=dinput.value;//

    if(!dinputvalue){
      return;
    }
    
    if(!inputvalue){
      return;
    }
  var newArray=tasks.slice();
   let b={};
   b['desc']=inputvalue;
   b['date']=dinputvalue;
  newArray.push(b);
  setTasks(newArray);
console.log(tasks);

  }
  function handleDelete(i){
    var newArray =tasks.slice();
    newArray.splice(i,1);
    setTasks(newArray);  

  }
  function formatDate(taskdate){
    let date = new Date(taskdate);
    return date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()+' '+(date.getHours()%12)+':'+date.getMinutes() + ' ' + (date.getHours()>=12?'pm':'am');
  }
  
  return (
    <div>
    <div className="backgroundColor">.</div>
    <div className="centerNew">
    <h1 className="title">ToDo App</h1>
    <br/><br/> 
      <table class="list-group">
        <tr>
    
          <th>Sr.no.</th>
          <th>Content</th>
          <th>Date</th>
          <th>Remove</th>
        </tr>
        { tasks.map((task,index) => <tr><td>{(index+1)}</td><td>{task.desc}</td><td>{formatDate(task.date)}</td><td><button onClick={() => handleDelete(index)} class="closebutton">X</button></td></tr>)}
      </table>
      {/* <button onClick={handleAdd}>Add task</button> */}
      <br/>
      <div className="input"> 
      <input type="text" placeholder="Enter here" id="taskinput"/><br/>
      <input type="datetime-local" id="dateinput"/>
      <br/>
      <button className='button-4' onClick={handleCancel}>Cancel</button>
      <button className='button-3' onClick={handleSave}>Save</button>
      </div>
    </div>
    </div>
  );
}
export default App;
