"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TextEditor({
  label,
  name,
  value,
  onChange,
  height = 300,
  
  error = "",
  errors= "",
  ...rest
}) {
  const errorMessage = Array.isArray(error) ? error[0] : error;
  const errorsMessage = Array.isArray(errors) ? errors[0] : errors;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className={errorMessage ? "ring-1 ring-red-500 rounded-md" : ""}>
        <Editor
          apiKey="l2t9706r7gb573uzlebu6o6404zvjwe1pkt8o9hcqowhqian"
          value={value}
          onEditorChange={(content) => onChange(name, content)}
          init={{
            height,
            menubar: false,
            plugins: [
              "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
              "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
              "insertdatetime", "media", "table", "help", "wordcount"
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline strikethrough | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | removeformat | help",
          }}
          {...rest}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
      {errorsMessage && (
        <p className="text-red-500 text-sm mt-1">{errorsMessage}</p>
      )}
    </div>
  );
}
