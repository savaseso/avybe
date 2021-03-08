import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: theme.spacing(3),
  },
  picture: {
    height: "200px",
    width: "200px",
    padding: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(2),
    border: "none",
    width: "100px",
    height: "45px",
    marginTop: "20px",
    borderRadius: "30px",
    marginLeft: "2rem",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    "&:hover": {
      background: "#617EE9",
    },
  },
  modal: {
    backgroundColor: "#fff",
    position: "absolute",
    float: "left",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width:"400px",
    height:"400px"
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin:theme.spacing(3)
  },
  input: {
    [`& fieldset`]: {
      borderRadius: 30,
    },
    width:"250px"
  },
}));

export default useStyles;
