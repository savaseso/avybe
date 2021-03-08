import React, { useContext } from "react";
import { useForm } from "../hooks/useForm";
import useStyles from "../css/form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, Typography } from "@material-ui/core";
import { AuthContext } from "../authContext";
import { toast } from "react-toastify";

const SignUp = ({ history }) => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const classes = useStyles();
  const [values, handleChange] = useForm({
    email: "",
    username: "",
    password: "",
  });

  const register = async (e) => {
    e.preventDefault();
    const { email, username, password } = values;
    try {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      };

      const response = await fetch(
        "http://localhost:8000/api/auth/register",
        config
      );
      const result = await response.json();
      if (result.token) {
        localStorage.setItem("token", result.token);
        setIsLoggedIn(true);
        history.push("/dashboard");
      } else {
        if (result.non_field_errors) {
          toast.error(`Email already in use`, {
            position: "bottom-right",
          });
        } else {
          toast.error(`${result.username[0]}`, { position: "bottom-right" });
        }
      }
    } catch (err) {
      toast.error(`${err}`, { position: "bottom-right" });
    }
  };

  return (
    <Box>
      <Box className={classes.container}>
        <Box className={classes.title}>
          <Typography variant="h4">Lets Get Started!</Typography>
          <Typography variant="h6" style={{ color: "#6583F2", opacity: 0.5 }}>
            Create an account
          </Typography>
        </Box>
        <form className={classes.form} onSubmit={register}>
          <TextField
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            size="medium"
            label="Your Email"
            className={classes.input}
            required
            fullWidth
            id="email"
            value={values.email}
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            name="username"
            variant="outlined"
            margin="normal"
            size="medium"
            label="Username"
            className={classes.input}
            required
            fullWidth
            id="username"
            value={values.username}
            autoComplete="username"
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            size="medium"
            label="Password"
            className={classes.input}
            id="password"
            required
            fullWidth
            inputProps={{ minLength: 6 }}
            value={values.password}
            autoComplete="password"
            onChange={handleChange}
          />
          <Button type="submit" className={classes.button}>
            Sign up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
