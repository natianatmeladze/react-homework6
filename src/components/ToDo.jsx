import deleteBtn from '../assets/delete.svg';
import editBtn from "../assets/edit.svg";
const ToDo = ({toDo,handleDelete, handleChange , handleEdit}) => {

  return (
    <>
    <li className="w-115 rounded-md border-2 border-gray-300 bg-gray-100 p-4 flex justify-between"> 
        <h2 className="text-md font-sans font-normal text-gray-700">{toDo.todo}</h2>
        <div className='flex gap-3'>
        <input type="checkbox" className="cursor-pointer" checked={toDo.completed} 
        onChange={() => handleChange(toDo.id)}
        />
        <button onClick={() => handleDelete(toDo.id)}>
            <img src={deleteBtn} className='w-5 h-5 cursor-pointer' alt="delete" />
        </button>
        <button onClick={() => handleEdit(toDo)}>
            <img src={editBtn} alt="edit" className='w-5 h-5 cursor-pointer'  />
        </button>
        </div>
    </li>
    </>
  )
}

export default ToDo
