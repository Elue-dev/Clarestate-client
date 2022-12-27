import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { registerType } from "@/types/auth_types";
import { TiUserOutline } from "react-icons/ti";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlinePassword } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./auth.module.scss";
import { BeatLoader } from "react-spinners";
import { validateEmail } from "../../services/auth_services";

const initialState: registerType = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [credentials, setCredentials] = useState(initialState);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordRef = useRef<any | undefined>();

  const { firstName, lastName, phone, email, password } = credentials;

  const validateForm = () => {
    if (!firstName) {
      setError("First Name is required");
      setTimeout(() => setError(""), 4000);
      return;
    } else if (!lastName) {
      setError("Last Name is required");
      setTimeout(() => setError(""), 4000);
      return;
    } else if (!phone || !/^\d+$/.test(phone)) {
      setError("Phonne Number is required and must be numbers");
      setTimeout(() => setError(""), 4000);
      return;
    } else if (!email) {
      setError("Email Address is required");
      setTimeout(() => setError(""), 4000);
      return;
    } else if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setTimeout(() => setError(""), 4000);
      return;
    } else if (!password) {
      setError("Password is required");
      setTimeout(() => setError(""), 4000);
      return;
    } else {
      setError("");
    }

    return true;
  };

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

  const addUser = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("form submitted");
    }
  };

  return (
    <section className={styles.auth}>
      <div className={styles["auth__wrapper"]}>
        <div className={styles["left__section"]}>
          <h1>Create An Account</h1>
          {error && (
            <p className={`${styles.alert} ${styles["error__msg"]}`}>{error}</p>
          )}
          <form onSubmit={addUser}>
            <label>
              <span>First Name</span>
              <div className={styles["auth__wrap"]}>
                <TiUserOutline />
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
                <TiUserOutline />
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
              <span>Phone Number</span>
              <div className={styles["auth__wrap"]}>
                <TiUserOutline />
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </label>
            <label>
              <span>Email Address</span>
              <div className={styles["auth__wrap"]}>
                <HiOutlineMail />
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
                <MdOutlinePassword />
                <input
                  type="password"
                  name="password"
                  value={password}
                  ref={passwordRef}
                  onChange={handleInputChange}
                  placeholder="At least 6 characters"
                />

                <b
                  onClick={handlePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {visible ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </b>
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
