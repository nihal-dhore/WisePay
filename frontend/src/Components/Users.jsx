import { useEffect, useState } from "react";
import { User } from "./User";
import axios from "axios";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetch() {
      const res = await axios.get("http://localhost:3000/api/v1/user/bulk?filter" + query);

      setUsers(res.data.user);
    }

    fetch();
  }, [query]);
  return (
    <div>
      <div className="mx-16 my-6">
        <input
          className="py-2.5 w-full rounded-md px-2.5 border-solid border-[1px] border-gray-400"
          type="text"
          placeholder="Search contacts"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div>
        {users.map(user => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};
