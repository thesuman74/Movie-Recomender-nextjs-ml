import { doLogout } from "@/app/action";
import React from "react";

const Logout = () => {
  return (
    <div>
      <form action={doLogout}>
        <button
          type="submit"
          className="bg-red-400 my-2 text-white px-4 py-2 rounded-lg"
        >
          Log Out
        </button>
      </form>
    </div>
  );
};

export default Logout;
