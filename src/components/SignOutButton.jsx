import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function SignOutButton({ className }) {
  const signOut = useSignOut();
  const navigate = useNavigate();

  function onClick() {
    signOut();
    navigate("/login");
  }

  return (
    <div className={"flex justify-end " + className}>
      <button onClick={onClick} className="p-2 rounded-md bg-red-100">
        Log Out
      </button>
    </div>
  );
}

export default SignOutButton;
