import { useAuth0 } from "@auth0/auth0-react";

export default function Nav() {
  const { user, logout } = useAuth0();

  return (
    <div className="m-auto flex flex-row justify-between w-full bg-slate-700 md:justify-between p-5 gap-2 items-center">
      <div>
        <h1 className="uppercase font-bold text-2xl">Task List</h1>
      </div>
      <div className="w-1/2 flex justify-end gap-4 items-center">
        <h2 className="font-bold">Welcome, {user?.name}</h2>
        <button
          className="uppercase bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log out
        </button>
      </div>
    </div>
  );
}
