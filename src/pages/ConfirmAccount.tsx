import React from "react";
import { Link, useParams } from "react-router-dom";
import { AlertProps } from "../interfaces/User";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  const { token } = useParams();
  const [confirmedAccount, setConfirmedAccout] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [alert, setAlert] = React.useState<AlertProps>({
    msg: "",
    error: undefined,
  });

  React.useEffect(() => {
    const confirmAccount = async () => {
      try {
        const { data } = await clientAxios(`/users/confirm/${token}`);

        setConfirmedAccout(true);
        setAlert({
          msg: data.msg,
          error: false,
        });
      } catch (error: any) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };

    setLoading(false);
    confirmAccount();
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl text-center">Confirm account!</h1>
      <div className=" bg-white">
        {!loading && <Alert msg={alert.msg} error={alert.error} />}
        {confirmedAccount && (
          <div className="flex justify-center">
            <Link
              to="/auth/signin"
              className="bg-primary text-black text-center rounded shadow py-3 w-full hover:cursor-pointer hover:opacity-80"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmAccount;
