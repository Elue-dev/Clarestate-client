import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/auth_slice";

export default function Home() {
  const user: any = useSelector(getUser);
  console.log(user);

  return <div>Hi {user.first_name}</div>;
}
