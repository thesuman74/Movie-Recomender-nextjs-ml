import { doLogout } from "@/app/action";
import React from "react";

const Logout = () => {
  return (
    <div>
      <form action={doLogout}>
        <button
          type="submit"
          className="bg-red-400 my-2 text-white p-1 rounded-lg"
        >
          Log Out
        </button>
      </form>
    </div>
  );
};

export default Logout;
