import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { loginType } from "@/types/auth_types";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./auth.module.scss";

const initialState: loginType = {
  emailOrPhone: "",
  password: "",
};

export default function Login() {
  const [values, setValues] = useState(initialState);
  const [visible, setVisible] = useState(false);
  const passwordRef = useRef<any | undefined>();

  const { emailOrPhone, password } = values;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handlePasswordVisibility = (): void => {
    setVisible(!visible);
    if (passwordRef.current.type === "password") {
      passwordRef.current.setAttribute("type", "text");
    } else {
      passwordRef.current.setAttribute("type", "password");
    }
  };

  const loginUser = (e: FormEvent): void => {
    e.preventDefault();
  };

  return (
    <section className={styles.auth}>
      <div className={styles["auth__wrapper"]}>
        <div className={styles["left__section"]}>
          <h1>Log Into Your Account</h1>
          <form onSubmit={loginUser}>
            <label>
              <span>Email or Phone Number</span>
              <div className={styles["auth__wrap"]}>
                <MdOutlineMail />
                <input
                  type="email"
                  name="emailOrPhone"
                  value={emailOrPhone}
                  onChange={handleInputChange}
                  placeholder="Enter your email or phone number"
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
            {/* {loading && (
              <button type="button" disabled className="btn submit__btn">
                <BeatLoader loading={loading} size={10} color={"#fff"} />
              </button>
            )}
            {!loading && (
              <button
                type="submit"
                className="btn submit__btn"
                onClick={registerUser}
              >
                Continue
              </button>
            )} */}
            <button type="submit" className={styles["submit__btn"]}>
              Continue
            </button>
            <div className={styles["auth__redirect"]}>
              <p>
                New to Clarestate Account?{" "}
                <Link to="/auth/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
        <div className={styles["right__section"]}>
          <span></span>
        </div>
      </div>
    </section>
  );
}
