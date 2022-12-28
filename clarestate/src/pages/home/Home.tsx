import { logoutUser } from "../../services/auth_services";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  REMOVE_ACTIVE_USER,
  SET_USER_TOKEN,
} from "../../redux/slices/auth_slice";
import { useEffect } from "react";

export default function Home() {
  const user: any = useSelector(getUser);
  const { first_name, last_name } = user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(REMOVE_ACTIVE_USER());
    dispatch(SET_USER_TOKEN(null));
  });

  const first = first_name.substring(0, 1);
  const last = last_name.substring(0, 1);
  const initials = first + last;

  const logout = async () => {
    await logoutUser();
    dispatch(REMOVE_ACTIVE_USER());
    dispatch(SET_USER_TOKEN(null));
  };

  return (
    <div>
      Hi, <b style={{ textTransform: "uppercase" }}>{initials}</b>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
