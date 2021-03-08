import React, { useEffect, useState } from "react";
import useStyles from "../css/dashboard";
import { Container, Grid } from "@material-ui/core";
import CardItem from "../components/CardItem";
import { toast } from "react-toastify";
import Form from "../components/Form";

const DashBoard = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  const getPosts = async (e) => {
    const token = localStorage.getItem("token");

    const config = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch("http://localhost:8000/api/posts/", config);
    const result = await response.json();
    if (result) {
      setPosts(result);
    }
  };

  const uploadPost = async (e, id, title, file) => {
    e.preventDefault();
    const newData = new FormData();
    newData.append("title", title);
    newData.append("picture", file);

    try {
      const token = localStorage.getItem("token");
      const config = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: newData,
      };
      const response = await fetch("http://localhost:8000/api/posts/", config);
      const result = await response.json();

      if (result.picture[0].includes("Upload a valid image")) {
        toast.error(`Please add an image file`, { position: "bottom-right" });
      } else {
        const currentPosts = [...posts];
        currentPosts.push(result);
        setPosts(currentPosts);
        toast.info(`Post added`, { position: "bottom-right" });
      }
    } catch (err) {
      toast.error(`${err}`, { position: "bottom-right" });
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container maxWidth="md">
      <Form
        form={classes.form}
        input={classes.input}
        button={classes.button}
        handleSubmit={uploadPost}
        text="Add post"
      />
      <Grid
        container
        item
        xs={12}
        spacing={3}
        alignContent="center"
        justify="center"
      >
        {posts.map((post) => {
          return (
            <Grid item xs={12} sm={6} key={post.id}>
              <CardItem post={post} posts={posts} setPosts={setPosts} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default DashBoard;
