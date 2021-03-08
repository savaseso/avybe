import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "5rem auto",
    width: "350px",
    ['@media (max-width:400px)']:{
      width:"250px"
    },
    height: "450px",
    background: "#fff",
    padding: "2rem",
    borderRadius: "2px",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "3rem",
  },
  button: {
    marginRight: theme.spacing(2),
    border: "none",
    width: "150px",
    height: "52px",
    marginTop: "20px",
    borderRadius: "30px",
    marginLeft: "2rem",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      background: "#617EE9",
    },
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    [`& fieldset`]: {
      borderRadius: 30,
    },
  }, 
}));

export default useStyles;
