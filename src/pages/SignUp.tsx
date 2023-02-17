import React from "react";
import { Link } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";
import { AlertProps, User } from "../interfaces/User";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const SignUp = () => {
  const [values, setValues] = React.useState<User>({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [alert, setAlert] = React.useState<AlertProps>({
    msg: "",
    error: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifico campos vacios
    if (
      [values.name, values.surname, values.email, values.password].includes("")
    ) {
      setAlert({ msg: "All fields are required", error: true });
      return;
    }

    // Creo el user y lo guardo en la API
    try {
      const { data } = await clientAxios.post("/users", values);

      setAlert({ msg: data.msg, error: false });

      setValues({
        name: "",
        surname: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { msg, error } = alert;
  return (
    <div className="w-full">
      <div className="mb-5">
        <p className="text-2xl">Create new account</p>
        <p className="text-sm text-gray-400">Please enter your details</p>
      </div>
      {msg && <Alert msg={msg} error={error} />}
      {(error === undefined || error === true) && (
        <div className="flex lg:w-96 flex-col justify-center">
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Tomas"
                className="w-full mt-3 p-3 border rounded-md text-sm"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block" htmlFor="surname">
                Surname
              </label>
              <input
                type="text"
                placeholder="Dziurdzia"
                className="w-full mt-3 p-3 border rounded-md text-sm "
                name="surname"
                value={values.surname}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full mt-3 p-3 border rounded-md text-sm "
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="*********"
                className="w-full mt-3 p-3 border rounded-md text-sm "
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <input
              type="submit"
              value="Create account"
              className="bg-primary w-full p-2 rounded-md shadow-sm hover:cursor-pointer hover:opacity-80"
            />
          </form>
          <button className="lg:w-96 mt-5">
            <GoogleButton />
          </button>
        </div>
      )}

      <div className="mt-6">
        <div className="flex text-sm mt-4 justify-center">
          <p className="mr-2 text-gray-500">Already have an account?</p>
          <Link to="/auth/signin" className="font-bold">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
