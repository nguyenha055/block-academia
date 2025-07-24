import React, { useState, useEffect, useRef } from "react"
import { useStackEdit } from "use-stackedit"

const TextAreaMD = ({setText}) => {
  const [value, setValue] = useState("");
  const isManualChange = useRef(false);
  const { openStackedit, onFileChange } = useStackEdit((newValue) => {
    isManualChange.current = false; // StackEdit update, not manual
    setValue(newValue);
  });

  useEffect(() => {
    if (value && isManualChange.current) {
      setText(value);
    };
  }, [value]);

  return (
    <div>
      <textarea
        value={value}
        className="border w-full border-gray-300 h-40 rounded-lg active:border-gray-950 p-4 dark:bg-neutral-900 dark:border-gray-900"
        onChange={(e) => {
          isManualChange.current = true; // Manual typing
          setValue(e.target.value)

          // If textarea is edited run the file change event on stackedit
          onFileChange()
        }}
      ></textarea>
      <button
        type="button"
        className="text-cyan-600 hover:text-cyan-500"
        onClick={() => {
          openStackedit({
            content: {
              // Markdown content.
              text: value,
              yamlProperties: {
                colorTheme: 'dark' // TODO: not working
              },
              properties: {
                colorTheme: 'dark' // TODO: not working
              }
            },
          }, true)
        }}
      >
        Open Editor
      </button>
      <button
        type="button"
        className="ml-2 text-blue-600 hover:text-blue-500"
        onClick={() => {
          setText(value);
        }}
      >
        Save Content
      </button>
    </div>
  )
}
export default TextAreaMD
