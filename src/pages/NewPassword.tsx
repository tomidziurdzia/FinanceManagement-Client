import React from "react";
import { Link, useParams } from "react-router-dom";
import GoogleIcon from "../assets/GoogleIcon";
import clientAxios from "../config/clientAxios";
import { AlertProps } from "../interfaces/User";
import Alert from "../components/Alert";

const NewPassword = () => {
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [alert, setAlert] = React.useState<AlertProps>({
    msg: "",
    error: undefined,
  });
  const [validToken, setValidToken] = React.useState(false);
  const [changedPassword, setChangedPassword] = React.useState(false);

  const { token } = useParams();

  React.useEffect(() => {
    const verifyToken = async () => {
      try {
        await clientAxios(`/users/forget-password/${token}`);
        setValidToken(true);
      } catch (error: any) {
        setAlert({ msg: error.response.data.msg, error: true });
      }
    };

    verifyToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifico campos vacios
    if ([password, repeatPassword].includes("")) {
      setAlert({
        msg: "There are empty fields",
        error: true,
      });
      return;
    }

    // Verifico que los password coincidan
    if (password !== repeatPassword) {
      setAlert({
        msg: "The passwords do not match",
        error: true,
      });
      return;
    }

    setAlert({ msg: "", error: undefined });

    // Guardando nuevo password
    try {
      const url = `/users/forget-password/${token}`;
      const { data } = await clientAxios.post(url, {
        password,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });

      setPassword("");
      setRepeatPassword("");
      setChangedPassword(true);

      setTimeout(() => {
        setAlert({ msg: "", error: undefined });
        setValidToken(false);
      }, 2000);
    } catch (error: any) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg, error } = alert;
  return (
    <div>
      <div className="mb-5">
        <p className="text-2xl">Recovery account</p>
        <p className="text-sm text-gray-400">Please enter your details</p>
      </div>
      <div>
        {msg && <Alert msg={msg} error={error} />}
        {validToken && (
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="*********"
                className="w-full mt-3 p-3 border rounded-md text-sm "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="repeat-password">Repeat password</label>
              <input
                type="password"
                placeholder="*********"
                className="w-full mt-3 p-3 border rounded-md text-sm "
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Save new password"
              className="bg-primary w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
            />
          </form>
        )}

        {changedPassword && (
          <div className="w-full flex justify-center mt-5">
            <Link
              to="/auth/signin"
              className="bg-primary w-full p-2 text-center rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPassword;
