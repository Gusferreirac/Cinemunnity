import React from "react";
import { useState } from "react";

function TagsInput(props) {
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);

    console.log(props);

    const handleChange = e => {
        const {value} = e.target;
        setTag(value);
    }

    const handleKeyDown = e => {
        if (e.key === "Enter" && tag !== "" && !tags.includes(tag)) {
            e.preventDefault();
            setTags([...tags, tag]);
            setTag("");
        } else if (e.key === "Backspace" && tag === "" && tags.length) {
            e.preventDefault();
            setTags(tags.slice(0, -1));
        }
    }

  return (
    <div className="inline-block relative w-full">
        <label className="block text-lg mb-2">{props.title}</label>
        <input className="w-full mb-2 p-2 border border-gray-600 rounded" id={props.id} placeholder={props.title + ' (Pressione Backspace para apagar o último item)'} value={tag} onChange={handleChange} onKeyDown={handleKeyDown} />
        {tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {tag}
            </span>
        ))}
    </div>
  );
}

export default TagsInput;