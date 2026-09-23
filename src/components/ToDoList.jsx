import { useEffect, useRef, useState } from "react";
import ToDo from "./ToDo";
import deleteBtn from "../assets/delete.svg";
import axios from "axios";
const ToDoList = () => {
  const [toDoList, setToDoList] = useState([]);
  const inputRef = useRef(null);
  const editInputref = useRef(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const responce = await fetch("https://dummyjson.com/todos?limit=5");
        // const data = await responce.json();
        // setToDoList(data.todos);

        const responce = await axios.get("https://dummyjson.com/todos?limit=5");
        const data = responce.data;
        setToDoList(data.todos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = async (todoId) => {
    const todo = toDoList.find((item) => item.id === todoId);
    try {
      const responce = await axios.patch(
        `https://dummyjson.com/todos/${todoId}`,
        {
          completed: !todo.completed,
        },
      );
      const data = responce.data;
      const updatedTodos = toDoList.map((todo) =>
        todoId === todo.id ? data : todo,
      );
      setToDoList(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await axios.delete(`https://dummyjson.com/todos/${todoId}`);
      const filteredToDos = toDoList.filter((todo) => todoId !== todo.id);
      setToDoList(filteredToDos);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    const todoValue = inputRef.current.value;
    if (todoValue === "") return;
    try {
      const responce = await axios.post("https://dummyjson.com/todos/add", {
        completed: false,
        todo: todoValue,
        userId: 2,
      });
      const data = responce.data;
      const updatedTodos = [data, ...toDoList];
      setToDoList(updatedTodos);
      inputRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
  };

  const saveTodo = async () => {
    const newValue = editInputref.current.value;
    try {
      const responce = await axios.patch(
        `https://dummyjson.com/todos/${selectedTodo.id}`,
        {
          todo: newValue,
        },
      );
      const data = responce.data;
      const updatedTodos = toDoList.map((todo) =>
        todo.id === selectedTodo.id ? data : todo,
      );
      setToDoList(updatedTodos);
      setSelectedTodo(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {selectedTodo && (
        <div className="inset-0 fixed bg-gray-300/80 flex flex-col gap-2 justify-center items-center">
          <div className="w-130 flex flex-col gap-3 rounded-md bg-white p-5">
            <div className=" flex gap-3 justify-between items-center flex-row-reverse">
              <button onClick={() => setSelectedTodo(null)} className="w-6 h-6">
                <img src={deleteBtn} alt="delete" />
              </button>
              <input
                type="text"
                className="w-full rounded-md bg-gray-100 border-2 outline-none px-3 py-2 border-gray-400"
                defaultValue={selectedTodo.todo}
                ref={editInputref}
              />
            </div>
            <button
              onClick={saveTodo}
              className="rounded-md bg-pink-300 px-4 py-2 cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-10">
        <div className="flex gap-6 mx-auto mt-10">
          <input
            type="text"
            placeholder="Add New Todo..."
            className="w-90 rounded-md bg-gray-100 border-2 outline-none p-3 border-gray-400 "
            ref={inputRef}
          />
          <button
            onClick={addTodo}
            className="rounded-md bg-pink-300 px-4 py-2 cursor-pointer"
          >
            Add
          </button>
        </div>
        <ul className="flex flex-col gap-3 mx-auto w-fit">
          {toDoList.map((todo) => (
            <ToDo
              key={todo.id}
              toDo={todo}
              handleChange={handleChange}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ToDoList;
