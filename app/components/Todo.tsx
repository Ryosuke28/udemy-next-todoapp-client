import React, { useState } from 'react'
import { TodoType } from '../types'
import useSWR from 'swr'
import { useTodos } from '../hooks/useTodos'
import { API_URL } from '@/constants/url';
type TodoProps = {
  todo: TodoType;
}


const Todo = ({ todo }: TodoProps) => {
  const [isEditing, setisEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(todo.title);
  const { todos, isLoading, error, mutate } = useTodos();

  const handleEdit = async () => {
    setisEditing(!isEditing);
    if (isEditing) {
      const response = await fetch(`${API_URL}/editTodo/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle }),
      });

      if (response.ok) {
        const editedTodo = await response.json();
        const updatedTodos = todos.map((todo: TodoType) =>
          todo.id === editedTodo.id ? editedTodo : todo
        );
        mutate(updatedTodos);
      }
    }
  }

  const handleDelete = async (id: number) => {
    const response = await fetch(`${API_URL}/deleteTodo/${todo.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const deleteTodo = await response.json();
      const updatedTodos = todos.filter((todo: TodoType) => todo.id !== id);
      mutate(updatedTodos);
    }
  }

  const toggleTodoCompletion = async (id: number, isCompleted: boolean) => {
    const response = await fetch(`${API_URL}/editTodo/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isCompleted: !isCompleted }),
    });

    if (response.ok) {
      const editedTodo = await response.json();
      const updatedTodos = todos.map((todo: TodoType) =>
        todo.id === editedTodo.id ? editedTodo : todo
      );
      mutate(updatedTodos);
    }
  }

  return (
    <div>
      <li className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="todo1"
                name="todo1"
                type="checkbox"
                className="h-4 w-4 text-teal-600 focus:ring-teal-500
                      border-gray-300 rounded"
                onChange={() => toggleTodoCompletion(todo.id, todo.isCompleted)}
              />
              <label className="ml-3 block text-gray-900">
                { isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="bg-gray-100 border-2 rounded px-2 py-1 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                  ) : (
                    <span className={`text-lg font-medium mr-2 ${todo.isCompleted ? "line-through" : ""}`}>{todo.title}</span>
                  )}
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="duration-150 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-2 rounded"
                onClick={handleEdit}
              >
                {isEditing ? "Save" : "✒"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded"
                onClick={() => handleDelete(todo.id)}
              >
                ✖
              </button>
            </div>
          </div>
        </li>
    </div>
  )
}

export default Todo
