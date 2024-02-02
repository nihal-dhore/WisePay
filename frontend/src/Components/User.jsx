/* eslint-disable react/prop-types */

import { useNavigate } from 'react-router-dom';
export function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center my-5">
      <div className="flex justify-start ml-16 items-center">
        <div className="mr-6 font-bold w-12 h-12 rounded-full bg-white text-center pt-[5px] text-[24px]">
          {user.firstName[0].toUpperCase()}
        </div>
        <div className="font-bold text-[20px]">{user.firstName + " " + user.lastName}</div>
      </div>
      <div className="mr-16">
        <button onClick={() => navigate("/send?userId=" + user._id + "&&name=" + user.firstName)} className="w-[100%] px-5 py-2.5 bg-black rounded text-white ">
          Pay Now
        </button>
      </div>
    </div>
  );
}