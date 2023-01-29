import React from "react";
import SearchBar from "../compoments/SearchBar";
import Table from "../compoments/Table";
import { getUsers } from "../request";

export default function Home() {
  const [filteredUsers, setFilteredUsers] = React.useState<User[]>([]);
  const [search, setSearch] = React.useState("");

  let usersRef = React.useRef() as React.MutableRefObject<User[]>;

  const filterUsers = () => {
    if (!search) {
      setFilteredUsers(usersRef.current);
      return;
    }

    const filtered = usersRef.current.filter((user) => {
      return user.login.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredUsers(filtered);
  };

  const onClearSearch = () => {
    setSearch("");
    setFilteredUsers(usersRef.current);
  };

  React.useEffect(() => {
    let avoid = false;

    const getUsersList = async () => {
      const response = await getUsers();

      if (!avoid) {
        usersRef.current = response;
        setFilteredUsers(response);
      }
    };

    getUsersList();

    return () => {
      avoid = true;
    };
  }, []);

  return (
    <div>
      <div className="bg-white px-4 py-3 container-shadow">
        <SearchBar
          search={search}
          onChangeSearch={setSearch}
          onClickSearch={() => filterUsers()}
          onClickClearSearch={() => onClearSearch()}
        />
      </div>

      <div className="bg-white mt-4 px-4 py-3 container-shadow">
        <Table data={filteredUsers} />
      </div>
    </div>
  );
}
