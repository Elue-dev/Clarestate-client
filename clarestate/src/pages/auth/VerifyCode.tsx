import { FormEvent, useState } from "react";
import { BeatLoader } from "react-spinners";
import styles from "./auth.module.scss";

export default function VerifyCode() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (element: any, index: number) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const clearField = () => {
    setError("");
    setOtp([...otp.map((v) => "")]);
  };

  const verifyCode = (e: FormEvent): void => {
    e.preventDefault();
    setError("");

    const OTP = otp.join("");
    if (OTP.length === 0) {
      return setError("Please enter your verification code");
    } else if (OTP.length < 6) {
      return setError("You verification code should be 6 digits");
    } else {
      setError("");
    }

    setOtp([...otp.map((v) => "")]);
  };

  return (
    <section className={styles.auth}>
      <div className={styles["auth__wrapper"]}>
        <div className={styles["left__section"]}>
          <h1>Verify Registration Code</h1>
          <form onSubmit={verifyCode}>
            <p>Please enter the verification code sent to your email</p>
            <br />
            {error && (
              <p className={`${styles.alert} ${styles["error__msg"]}`}>
                {error}
              </p>
            )}
            <div className={styles["otp__wrapper"]}>
              {otp.map((data, index) => {
                return (
                  <input
                    className={styles["otp__field"]}
                    type="text"
                    name="otp"
                    //@ts-ignore
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                );
              })}
            </div>
            <p className={styles.clear} onClick={clearField}>
              Clear All
            </p>
            {loading && (
              <button type="button" disabled className={styles["submit__btn"]}>
                <BeatLoader loading={loading} size={10} color={"#fff"} />
              </button>
            )}
            {!loading && (
              <button type="submit" className={styles["submit__btn"]}>
                Verify
              </button>
            )}
          </form>
        </div>
        <div className={styles["right__section"]}>
          <span></span>
        </div>
      </div>
    </section>
  );
}
