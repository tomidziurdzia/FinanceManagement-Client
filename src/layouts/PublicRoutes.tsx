import { Outlet } from "react-router-dom";

import image from "../assets/image.png";

const PublicRoutes = () => {
  return (
    <div className="container mx-auto md:flex md:mt-20 justify-center max-w-screen-lg shadow rounded-md bg-white">
      <div className="w-1/2 m-auto">
        <div className="w-full px-10">
          <Outlet />
        </div>
      </div>
      <div className="w-1/2">
        <img src={image} className="rounded-r-md" />
      </div>
    </div>
  );
};

export default PublicRoutes;
