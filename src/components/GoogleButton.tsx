import React from "react";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";

interface Props {
  setUser?: React.Dispatch<React.SetStateAction<{}>>;
}

const GoogleButton = ({ setUser }: Props) => {
  const { pathname } = useLocation();
  const route = pathname.split("/")[2];

  function handleCallbackResponse(response: any) {
    const userObject: any = jwtDecode(response.credential);

    setUser!(userObject);
    document.getElementById("signInDiv")!.hidden = true;
  }

  React.useEffect(() => {
    // @ts-ignore
    google.accounts!.id.initialize({
      client_id: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,

      callback: handleCallbackResponse,
    });

    const docGetId = document.getElementById("signInDiv");
    // @ts-ignore
    google.accounts.id.renderButton(docGetId, {
      text:
        route === "signin"
          ? "signin_with"
          : route === "signup"
          ? "signup_with"
          : "",
      theme: "outline",
      size: "large",
      type: "standard",
      logo_alignment: "center",
      width: 342,
      locale: "EN-en",
      border: "none",
    });
    // @ts-ignore
    google.accounts.id.prompt();
  }, []);
  return (
    <div className="w-full">
      <div id="signInDiv" className="flex justify-center"></div>
    </div>
  );
};

export default GoogleButton;
