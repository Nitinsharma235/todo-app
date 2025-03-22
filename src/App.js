import { useState } from 'react';
import {useReactTable,getCoreRowModel,flexRender,getPaginationRowModel,getSortedRowModel,getFilteredRowModel} from '@tanstack/react-table'
import { v4 as uuid } from "uuid";
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
    const dinputvalue=dinput.value;

    const unique_id = uuid();
    const small_id = unique_id.slice(0, 8);

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
    b['uuid']=small_id;
    newArray.push(b);
    setTasks(newArray);
    setTimeout(() => {
      table.setPageIndex(table.getPageCount() - 1); // Move to the last page
    }, 0);
    console.log(tasks);
  }
  function handleDelete(i) {
    setTasks(tasks.filter(task => task.uuid !== i));
  }
  // function handleSearch() {

  //   const sinput=document.getElementById("searchinput");
  //   const sinputvalue=sinput.value;
  //   alert(sinputvalue);
  //   setTasks(tasks.filter(task => task.desc === sinputvalue));
  // }
  // function handleDelete(i){
  //   var newArray =tasks.slice();
  //   newArray.splice(i,1);
  //   setTasks(newArray);
  // }
  function formatDate(taskdate){
    let date = new Date(taskdate);
    return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+(date.getHours()%12===0?12:date.getHours()%12)+':'+date.getMinutes() + ' ' + (date.getHours()>=12?'pm':'am');
  }
  const columns=[

    {
      header:'Sr.no.',
      accessorFn: (row, index) => index + 1, 
      footer:'Sr.no', 

    },
    {
      header:'Content',
      accessorKey:'desc',
      footer:'Content'

    },    {
      header:'Date',
      accessorFn: (row) => formatDate(row.date), 
      footer:'Date',
    },
    {
      header:'Remove',
      cell: ({ row }) => (
        <button onClick={() => handleDelete(row.original.uuid)} className="closebutton">
          Delete
        </button>
      ), 
      footer:'Remove'

    },
  ]
  const[sorting,setSorting]=useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 }); 
  const[filtering,setFiltering]=useState('')
  const table=useReactTable(
    { data:tasks,
      columns,
      getCoreRowModel:getCoreRowModel(),
      getPaginationRowModel:getPaginationRowModel(),
      getSortedRowModel:getSortedRowModel(),
      getFilteredRowModel:getFilteredRowModel(),
      state:{
        sorting:sorting,
        pagination:pagination,
        globalFilter:filtering

      },
      onSortingChange: setSorting,
      onPaginationChange: setPagination,
      onGlobalFilterChange: setFiltering
    })
  return (
    <div>
    <div className="backgroundColor">.</div>
    <div className="centerNew">
    <h1 className="title">ToDo App</h1>
    <br/><br/> 
    <table className='list-group'>
        <thead>
        {table.getHeaderGroups().map
        (headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} 
                  onClick={header.column.getToggleSortingHandler()}>
               <div> {header.isPlaceholder ? null
                :flexRender(header.column.columnDef.header,header.getContext()
                )}
                  {
                        { asc: '🔼', desc: '🔽' }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                      
                      </div>
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map(row =>(
            <tr key={row.id}>
             {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}

              </td>
             ))}
             </tr>
          ))}
          <tr>
          </tr>
        </tbody>
      </table>
      <br/>
      <div>
        <button onClick={() => table.setPageIndex(0)}>First Page</button>
        <button  disabled={!table.getCanPreviousPage()}  onClick={() => table.previousPage()}>Previous Page</button>
        <button  disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Next Page</button>
        <button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>Last Page</button>
      </div>
      <div className="input"> 
      <input type="text" placeholder="Enter here" id="taskinput"/><br/>
      <input type="datetime-local" id="dateinput"/><br/>
       <input type="text" placeholder="search here" value={filtering} onChange={(e) =>setFiltering(e.target.value)} />
      <br/>
      <button className='button-4' onClick={handleCancel}>Cancel</button>
      <button className='button-3' onClick={handleSave}>Save</button><br/>
      <div className="sinput">
     
      {/* <button className='button-5' onClick={handleSearch}>search</button>
      <button className='button-6' onClick={1}>X</button> */}
      </div>
      </div>
    </div>
    </div>
  );
}
export default App;
