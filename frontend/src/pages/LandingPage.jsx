import { useNavigate } from "react-router-dom";
export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="align-middle mt-[350px]">
      <div className="text-center pb-[10px] text-[35px] font-bold">
        Smart Payments, Swift Transactions <br />
        Welcome to Wise Pay
      </div>
      <div className="flex justify-center">
        <button
          className="w-[300px] mt-6 mx-10 py-2.5 bg-black text-white rounded-md"
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
        <button
          className="w-[300px] mt-6 mx-10 py-2.5 bg-black text-white rounded-md"
          onClick={() => navigate("/signin")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
