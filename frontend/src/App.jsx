import { useEffect, useState } from "react";
import axios from "axios";

// ✅ baseURL 명확하게 설정
const api = axios.create({
  baseURL: "/api",
});

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // 1. 목록 조회
  const fetchTodos = async () => {
    try {
      const res = await api.get("/todos");
      console.log("GET 성공:", res.data); // ✅ 디버깅
      setTodos(res.data);
    } catch (err) {
      console.error("GET 에러:", err.response || err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 2. 추가
  const addTodo = async () => {
    if (!text.trim()) return;

    try {
      const res = await api.post("/todos", { title: text });
      console.log("POST 성공:", res.data); // ✅ 디버깅
      setText("");
      fetchTodos();
    } catch (err) {
      console.error("POST 에러:", err.response || err.message);
    }
  };

  // 3. 체크
  const toggleTodo = async (todo) => {
    try {
      const res = await api.put(`/todos/${todo._id}`, {
        completed: !todo.completed,
      });
      console.log("PUT 성공:", res.data); // ✅ 디버깅
      fetchTodos();
    } catch (err) {
      console.error("PUT 에러:", err.response || err.message);
    }
  };

  // 4. 삭제
  const deleteTodo = async (id) => {
    try {
      const res = await api.delete(`/todos/${id}`);
      console.log("DELETE 성공:", res.data); // ✅ 디버깅
      fetchTodos();
    } catch (err) {
      console.error("DELETE 에러:", err.response || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>

        {/* 입력 */}
        <div className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 flex-1 rounded"
            placeholder="할 일 입력"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 rounded"
          >
            추가
          </button>
        </div>

        {/* 리스트 */}
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center mb-2"
            >
              <span
                onClick={() => toggleTodo(todo)}
                className={`cursor-pointer ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </span>

              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}