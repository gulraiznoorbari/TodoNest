import { useState, useRef } from "react";

const TodoCard = ({ todo }) => {
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

    return (
        <div className={`todo ${todo.complete ? "todo--complete" : ""}`}>
            <input type="checkbox" checked={todo.complete} />
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
