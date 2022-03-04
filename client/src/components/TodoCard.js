import axios from "axios";
import { useState, useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const TodoCard = ({ todo }) => {
    const { todoComplete, todoInComplete } = useGlobalContext();
    const [content, setContent] = useState(todo.content);
    const [editing, setEditing] = useState(false);

    const input = useRef(null);

    const edit = (e) => {
        e.preventDefault();
        setEditing(true);

        input.current.focus();
    };

    const cancelEditing = (e) => {
        if (e) {
            e.preventDefault();
        }
        setEditing(false);
        setContent(todo.content);
    };

    const markAsComplete = (e) => {
        e.preventDefault();
        axios.put(`/api/todos/${todo._id}/complete`).then((res) => {
            todoComplete(res.data);
        });
    };

    const markAsIncomplete = (e) => {
        e.preventDefault();
        axios.put(`/api/todos/${todo._id}/incomplete`).then((res) => {
            todoInComplete(res.data);
        });
    };

    return (
        <div className={`todo ${todo.complete ? "todo--complete" : ""}`}>
            <input
                type="checkbox"
                checked={todo.complete}
                onChange={!todo.complete ? markAsComplete : markAsIncomplete}
            />
            <input
                type="text"
                ref={input}
                value={content}
                readOnly={!editing}
                onChange={(e) => setContent(e.target.value)}
            />

            <div className="todo__controls">
                {!editing ? (
                    <>
                        {!todo.complete && <button onClick={edit}>Edit</button>}
                        <button>Delete</button>
                    </>
                ) : (
                    <>
                        <button>Save</button>
                        <button onClick={cancelEditing}>Cancel</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoCard;
