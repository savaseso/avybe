import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { useForm } from "../hooks/useForm";

const Form = (props) => {
  const { form, input, button, id, handleSubmit, text } = props;
  const [values, handleChange] = useForm({ title: "" });
  const [file, setFile] = useState("");

  const uploadImage = (files) => {
    setFile(files[0]);
  };

  return (
    <form
      className={form}
      onSubmit={(e) => handleSubmit(e, id, values.title, file)}
    >
      <TextField
        name="title"
        type="title"
        variant="outlined"
        margin="normal"
        size="medium"
        label="Picture title"
        className={input}
        required
        fullWidth
        id="title"
        value={values.title}
        autoComplete="title"
        autoFocus
        onChange={handleChange}
      />
      <input
        accept="image/*"
        id={text}
        type="file"
        hidden
        onChange={(e) => uploadImage(e.target.files)}
        required
      />
      <label htmlFor={text}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <Button type="submit" className={button}>
        {text}
      </Button>
    </form>
  );
};

export default Form;
