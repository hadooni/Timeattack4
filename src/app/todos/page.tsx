"use client";

import { todos } from "@/types/todos";
import axios from "axios";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState<todos[]>([]);
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const getTodoList = async () => {
    const res = await fetch("http://localhost:4000/todos");
    const data = await res.json();
    setTodos(data);
  };

  const addTodoList = async () => {
    const newPost = {
      id: new Date().getTime().toString(),
      title: title,
      contents: contents,
      isDone: false,
    };
    // const options = {
    //   method: "POST",
    //   body: JSON.stringify(newPost),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // const res = await fetch("http://localhost:4000/todos", options);
    // const data = await res.json();
    const { data } = await axios.post("http://localhost:4000/todos", newPost);
    setTodos(data);
  };

  const updateTodoList = async (id: string) => {
    const updateTodo = todos.filter((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });

    const { data } = await axios.patch(
      `http://localhost:4000/todos/${id}`,
      updateTodo
    );
    setTodos(data);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  if (!todos) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <header>My Todo List</header>
      <form onSubmit={addTodoList} className="mb-5">
        <span>제목</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span>내용</span>
        <input
          type="text"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <button>추가하기</button>
      </form>
      <main>
        <div>
          <h2>Working</h2>
          {todos.map(
            (todo) =>
              todo.isDone === false && (
                <div key={todo.id} className="mb-5">
                  <h2>할일 : {todo.title}</h2>
                  <p>내용 : {todo.contents}</p>
                  <button>삭제하기</button>
                  <button onClick={() => updateTodoList(todo.id)}>완료</button>
                </div>
              )
          )}
        </div>
        ==============
        <div>
          <h2>Done</h2>
          {todos.map(
            (todo) =>
              todo.isDone === true && (
                <div key={todo.id} className="mb-5">
                  <h2>할일 : {todo.title}</h2>
                  <p>내용 : {todo.contents}</p>
                  <button>삭제하기</button>
                  <button>완료</button>
                </div>
              )
          )}
        </div>
      </main>
    </>
  );
};

export default TodoList;
