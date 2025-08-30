import { useEffect, useState } from "react";
import Trie from "../scripts/trie.ts";

function AutoCompleteItem({ name, key = "autocomplete", onClick, onKeyDown }) {
  return (
    <li
      className="collapse-item"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      key={`tag_${key}_${name}`}
    >
      {name}
    </li>
  );
}

export default function AutoComplete(
  { placeholder = "Select from options", form_name, options, is_input = true },
) {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [trie, setTrie] = useState(new Trie());

  useEffect(() => {
    trie.multi_insert(options);
    setTrie(trie);
  }, [options]);

  const handle_on_focus = (e) => {
    const value = e.currentTarget.value;

    if ("" === value) {
      setSuggestions(options);
    }
  };

  const handle_input_change = (e) => {
    const input_value = e.currentTarget.value;

    setUserInput(input_value);

    if (input_value === "") {
      setSuggestions([]);
      return;
    }

    setSuggestions([...trie.starts_with(input_value)]);
  };

  const handle_key_press = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      e.preventDefault();

      if (suggestions.includes(userInput)) {
        setSuggestions([]);
        setUserInput(userInput);
      }

      if (suggestions.length === 1) {
        setUserInput(suggestions[0]);
        setSuggestions([]);
      }
    }
  };

  const suggestion_onclick = (e) => {
    setSuggestions([]);

    setUserInput(e.target.innerText);
  };

  const suggestion_onkeydown = (e) => {
    if (e.key === "Enter" && userInput.trim() !== "") {
      e.preventDefault();

      setSuggestions([]);
      setUserInput(e.target.innerText);
    }
  };

  return (
    <div className="collapse-root">
      <input
        className="autocomplete-trigger"
        type="text"
        placeholder={placeholder}
        onInput={handle_input_change}
        onKeyDown={handle_key_press}
        onFocus={handle_on_focus}
        value={userInput}
      />
      <ul
        className="autocomplete-items"
        key={`${form_name}_searchbar_suggestion`}
      >
        {suggestions.map((suggestion, index) => (
          <AutoCompleteItem
            name={suggestion}
            key={`${form_name}_${index}`}
            onClick={suggestion_onclick}
            onKeyDown={suggestion_onkeydown}
          />
        ))}
      </ul>
    </div>
  );
}
