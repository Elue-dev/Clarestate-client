import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/auth_slice";

export default function Home() {
  const user: any = useSelector(getUser);
  const { first_name, last_name } = user;

  const first = first_name.substring(0, 1);
  const last = last_name.substring(0, 1);
  const initials = first + last;

  return (
    <div>
      Hi, <b style={{ textTransform: "uppercase" }}>{initials}</b>
    </div>
  );
}
