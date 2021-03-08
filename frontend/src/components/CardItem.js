import React, { useState } from "react";
import useStyles from "../css/card";
import { Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Card, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { toast } from "react-toastify";
import Form from "./Form";

const CardItem = ({ post, posts, setPosts }) => {
  const classes = useStyles();
  const { picture, title, id } = post;
  const [open, setOpen] = useState(false);

  const updatePost = async (e, id, title, file) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("title", title);
    newData.append("picture", file);
    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: newData,
      };
      const response = await fetch(
        `http://localhost:8000/api/posts/${id}`,
        config
      );
      const result = await response.json();

      if (result.picture[0].includes("Upload a valid image")) {
        toast.error(`Please add an image file`, { position: "bottom-right" });
      } else {
        const currentPosts = [...posts];
        const updatedPosts = currentPosts.map((el) =>
          el.id === id ? { ...result } : el
        );
        setPosts(updatedPosts);
        setOpen(false);
        toast.info(`Post updated`, { position: "bottom-right" });
      }
    } catch (err) {
      toast.error(`${err}`, { position: "bottom-right" });
    }
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        image={picture}
        className={classes.picture}
        title="Picture"
      />
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {title}
        </Typography>
        <Button className={classes.button} onClick={() => setOpen(true)}>
          Edit
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box className={classes.modal}>
            <Form
              form={classes.form}
              input={classes.input}
              button={classes.button}
              id={id}
              handleSubmit={updatePost}
              text="Update"
            />
          </Box>
        </Modal>
      </CardContent>
    </Card>
  );
};

export default CardItem;
