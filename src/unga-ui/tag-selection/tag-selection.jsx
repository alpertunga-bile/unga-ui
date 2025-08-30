import { useEffect, useState } from "react";
import Trie from "../scripts/trie.ts";
import Chip from "../chip/chip.jsx";

function TagSelectionAutoCompleteItem(
  { name, key = "tag_selection", onClick, onKeyDown },
) {
  return (
    <li
      className="collapse-item"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      key={`tagsel_${key}_${name}`}
    >
      {name}
    </li>
  );
}

export default function TagSelection(
  {
    placeholder = "Select tags from the options",
    form_name = "tag",
    options,
    prev_tags = [""],
    is_input = true,
  },
) {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState(new Set(prev_tags));
  const [trie, setTrie] = useState(new Trie());

  useEffect(() => {
    trie.multi_insert(options);
    setTrie(trie);
    setSuggestions([]);
  }, [options]);

  const handle_on_focus = (e) => {
    const value = e.currentTarget.value;

    if ("" === value && tags.size === 0) {
      setSuggestions(options);
    }
  };

  const handle_input_change = (e) => {
    const input_value = e.currentTarget.value;

    setUserInput(input_value);

    if ("" === input_value) {
      setSuggestions([]);
      return;
    }

    setSuggestions([...trie.starts_with(input_value)]);
  };

  const add_tag = (value) => {
    setUserInput("");
    setSuggestions([]);

    if (!tags.has(value)) {
      setTags(new Set([...tags, value]));
    }
  };

  const handle_key_press = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      e.preventDefault();

      if (suggestions.includes(userInput)) {
        add_tag(userInput);
      }

      if (suggestions.length === 1) {
        add_tag(suggestions[0]);
      }
    }
  };

  const suggestion_onclick = (e) => {
    const value = e.target.innerText;

    add_tag(value);
  };

  const suggestion_onkeydown = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      e.preventDefault();

      add_tag(e.target.innerText);
    }
  };

  const tag_onclick = (e) => {
    setTags(new Set([...tags].filter((val) => val !== e.target.innerText)));
  };

  return (
    <div className="collapse-root">
      <input
        className="tag-selection-trigger"
        type="text"
        placeholder={placeholder}
        onInput={handle_input_change}
        onKeyDown={handle_key_press}
        onFocus={handle_on_focus}
        value={userInput}
      />
      <ul className="tag-selection-items" key={`${form_name}_suggestions`}>
        {suggestions.map((suggestion, index) => (
          <TagSelectionAutoCompleteItem
            name={suggestion}
            key={`${form_name}_${index}_suggestion`}
            onClick={suggestion_onclick}
            onKeyDown={suggestion_onkeydown}
          />
        ))}
      </ul>
      <div className="tag-selection-tags">
        {[...tags].map((tag) => (
          <Chip
            key={`${form_name}_tag`}
            onClick={tag_onclick}
            name={tag}
            form_name={form_name}
            is_input={is_input}
          />
        ))}
      </div>
    </div>
  );
}
