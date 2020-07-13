import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { fetchStudyprogrammes } from "../redux/studyprogrammes/actions";
import auth from "../services/auth";
import Alert from "../components/alert";

const Registration = ({ fetchStudyprogrammes, studyprogramme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [year, setYear] = useState("");
  const [selectedStudyprogramme, setselectedStudyprogramme] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(() => {
    fetchStudyprogrammes();
  }, []);

  const classes = useStyles();

  const doSubmit = async () => {
    try {
      await auth.register(
        firstname,
        lastname,
        email,
        password,
        year,
        selectedStudyprogramme
      );
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setAlert({
          open: true,
          message: ex.response.data,
          severity: "error",
        });
      }
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ ...alert, open: false });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => setFirstname(event.target.value)}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event) => setLastname(event.target.value)}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="year"
                label="Study Year"
                name="year"
                autoComplete="year"
                onChange={(event) => setYear(event.target.value)}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel id="simple-select-label">
                  Study Programme
                </InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={selectedStudyprogramme}
                  onChange={(event) =>
                    setselectedStudyprogramme(event.target.value)
                  }
                >
                  {studyprogramme &&
                    studyprogramme.studyprogramme &&
                    studyprogramme.studyprogramme.map((menuItem) => (
                      <MenuItem
                        key={menuItem.idStudyProgramme}
                        value={menuItem.idStudyProgramme}
                      >
                        {menuItem.Name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => doSubmit()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" style={{ color: "darkgrey" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Alert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClick={(reason) => handleClose(reason)}
      ></Alert>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    studyprogramme: state.studyprogramme,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudyprogrammes: () => dispatch(fetchStudyprogrammes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#C7C7C7",
    },
  },
  formControl: {
    minWidth: "100%",
  },
}));
