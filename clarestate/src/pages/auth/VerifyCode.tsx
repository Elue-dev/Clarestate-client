import { FormEvent, useState } from "react";
import styles from "./auth.module.scss";

export default function VerifyCode() {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element: any, index: number) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const verifyCode = (e: FormEvent): void => {
    e.preventDefault();

    const OTP = otp.join("");
    if (OTP.length === 0) {
      return alert("error");
    } else if (OTP.length < 6) {
      return alert("invalid otp");
    }

    console.log(OTP.length);
  };

  return (
    <section className={styles.auth}>
      <div className={styles["auth__wrapper"]}>
        <div className={styles["left__section"]}>
          <h1>Verify Registration Code</h1>
          <form onSubmit={verifyCode}>
            <p>Please enter the verification code sent to your email</p>
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
            <p
              className={styles.clear}
              onClick={(e) => setOtp([...otp.map((v) => "")])}
            >
              Clear All
            </p>
            <button type="submit" className={styles["submit__btn"]}>
              Verify
            </button>
          </form>
        </div>
        <div className={styles["right__section"]}>
          <span></span>
        </div>
      </div>
    </section>
  );
}
