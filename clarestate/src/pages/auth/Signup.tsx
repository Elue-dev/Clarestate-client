import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { registerType } from "@/types/auth_types";
import { BiUser } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./auth.module.scss";
import { BeatLoader } from "react-spinners";

const initialState: registerType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [credentials, setCredentials] = useState(initialState);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordRef = useRef<any | undefined>();

  const { firstName, lastName, email, password } = credentials;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handlePasswordVisibility = (): void => {
    setVisible(!visible);
    if (passwordRef.current.type === "password") {
      passwordRef.current.setAttribute("type", "text");
    } else {
      passwordRef.current.setAttribute("type", "password");
    }
  };

  const addUser = (e: FormEvent): void => {
    e.preventDefault();
  };

  return (
    <section className={styles.auth}>
      <div className={styles["auth__wrapper"]}>
        <div className={styles["left__section"]}>
          <h1>Create An Account</h1>
          <form onSubmit={addUser}>
            <label>
              <span>First Name</span>
              <div className={styles["auth__wrap"]}>
                <BiUser />
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                />
              </div>
            </label>
            <label>
              <span>Last Name</span>
              <div className={styles["auth__wrap"]}>
                <BiUser />
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
              </div>
            </label>
            <label>
              <span>Email Address</span>
              <div className={styles["auth__wrap"]}>
                <MdOutlineMail />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  placeholder="Enter your valid email"
                />
              </div>
            </label>
            <label>
              <span>Password</span>
              <div className={styles["password__field"]}>
                <RiLockPasswordLine />
                <input
                  type="password"
                  name="password"
                  value={password}
                  ref={passwordRef}
                  onChange={handleInputChange}
                  placeholder="At least 6 characters"
                />

                <span onClick={handlePasswordVisibility}>
                  {visible ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </span>
              </div>
            </label>
            {loading && (
              <button type="button" disabled className={styles["submit__btn"]}>
                <BeatLoader loading={loading} size={10} color={"#fff"} />
              </button>
            )}
            {!loading && (
              <button type="submit" className={styles["submit__btn"]}>
                Continue
              </button>
            )}
            <div className={styles["auth__redirect"]}>
              <p>
                Own a Clarestate Account? <Link to="/auth/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
        <div className={styles["right__section"]}>
          <h1></h1>
        </div>
      </div>
    </section>
  );
}
