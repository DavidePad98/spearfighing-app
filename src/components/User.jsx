import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActionUsers } from "../redux/action";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.users);
  const tokens = useSelector((state) => state.users.tokens);

  useEffect(() => {
    dispatch(fetchActionUsers(tokens.admin));
  }, [dispatch, tokens]);

  return (
    <div>
      {user.map((user, i) => (
        <div key={i}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default User;
