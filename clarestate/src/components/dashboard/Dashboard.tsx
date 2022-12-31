import {
  getUser,
  getUserToken,
  SET_ACTIVE_USER,
} from "../../redux/slices/auth_slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./dashboard.module.scss";
import { userType } from "../../types/user_type";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { TiUserOutline } from "react-icons/ti";
import { TbPhone } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { RiFolderUserLine } from "react-icons/ri";
import { server_url, updateUser } from "../../services/users_services";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const user: any = useSelector(getUser);
  const token: any = useSelector(getUserToken);
  const { first_name, last_name, photo, isVerified, email, phone, bio, _id } =
    user;
  const [credentials, setCredentials] = useState({
    fName: first_name,
    lName: last_name,
    uEmail: email,
    uPhone: phone,
    uBio: bio,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //   console.log(user);

  const { fName, lName, uPhone, uEmail, uBio } = credentials;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    setUserPhoto(file);
    //@ts-ignore
    setImagePreview(URL.createObjectURL(file));
  };

  const updateAccount = async (e: FormEvent) => {
    e.preventDefault();

    let imageUrl;
    if (userPhoto && userPhoto?.type.includes("image")) {
      const image = new FormData();
      image.append("file", userPhoto);
      image.append("cloud_name", "dwdsjbetu");
      image.append("upload_preset", "oj28w9l5");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dwdsjbetu/image/upload",
        { method: "post", body: image }
      );
      const imageData = await response.json();
      imageUrl = imageData.url.toString();
    }

    const userData = {
      _id,
      first_name: fName,
      last_name: lName,
      phone: uPhone,
      email: uEmail,
      bio: uBio,
      //@ts-ignore
      photo: userPhoto ? imageUrl : photo,
    };

    try {
      setLoading(true);
      const response = await updateUser(_id, token, userData);
      if (response) {
        dispatch(SET_ACTIVE_USER(userData));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  const fetchUserProperties = async () => {
    return await axios.get(`${server_url}/api/users/my-properties`, {
      headers: { authorization: `Bearer ${token}` },
    });
  };

  const { data, isLoading, refetch } = useQuery(
    "properties",
    fetchUserProperties,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <h1>loading data...</h1>;
  }

  const properties = data?.data.properties;
  console.log(properties);

  return (
    <section className={styles.dashboard}>
      <div className={styles["dashboard__wrapper"]}>
        <div className={styles["left__dashboard"]}>
          <div className={styles["user__det"]}>
            <div>
              {!imagePreview ? (
                <>
                  <img src={photo} alt={first_name} />
                  <label
                    htmlFor="photo"
                    className={`${styles["form__label"]} ${styles["photo__label"]}`}
                  >
                    <MdAddAPhoto />
                  </label>
                </>
              ) : (
                <>
                  <img src={imagePreview} alt="new photo" />
                  <label
                    htmlFor="photo"
                    className={`${styles["form__label"]} ${styles["photo__label"]}`}
                  >
                    <MdAddAPhoto />
                  </label>
                </>
              )}

              <input
                type="file"
                onChange={(e) => handleImageChange(e)}
                accept="image/*"
                className={styles["form__upload"]}
                name="photo"
                id="photo"
              />
            </div>
          </div>
          <h2>{`${first_name} ${last_name}`}</h2>
          <form onSubmit={updateAccount}>
            <div className={styles.fields}>
              <label>
                <span>First Name</span>
                <div className={styles["auth__wrap"]}>
                  <TiUserOutline />
                  <input
                    type="text"
                    name="fName"
                    value={fName}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
              <label>
                <span>Last Name</span>
                <div className={styles["auth__wrap"]}>
                  <TiUserOutline />
                  <input
                    type="text"
                    name="lName"
                    value={lName}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
              <label>
                <span>Phone Number</span>
                <div className={styles["auth__wrap"]}>
                  <TbPhone />
                  <input
                    type="tel"
                    name="uPhone"
                    value={uPhone}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
              <label>
                <span>Email Address</span>
                <div className={styles["auth__wrap"]}>
                  <HiOutlineMail />
                  <input
                    type="email"
                    name="uEmail"
                    value={uEmail}
                    onChange={handleInputChange}
                    disabled
                  />
                </div>
              </label>
              <label>
                <span>Bio</span>
                <div className={styles["auth__wrap"]}>
                  <RiFolderUserLine />
                  <textarea
                    name="uBio"
                    value={uBio}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
            </div>
            {loading ? (
              <button type="button" className={styles["submit__btn"]}>
                Updating...
              </button>
            ) : (
              <button type="submit" className={styles["submit__btn"]}>
                Update Credentials
              </button>
            )}
          </form>
        </div>
        <div className={styles["right__dashboard"]}>
          <h1>Properties you added</h1>
          {properties.length === 0 ? (
            <h3>You have not added any properties yet</h3>
          ) : (
            <div className={styles["users__prop"]}>
              <h3>
                You have added {properties.length}{" "}
                {properties.length === 1 ? "property" : "properties"} to
                Clarestate.
              </h3>
              {properties.map((property: any) => {
                const { name, price, slug, purpose } = property;
                return (
                  <Link to={`/property/${slug}`}>
                    <div className={styles.card}>
                      <div>
                        <b>Property Name:</b>
                        &nbsp;{name}
                      </div>
                      <div>
                        <b>Property Price:</b>
                        &nbsp;NGN {new Intl.NumberFormat().format(price)}
                      </div>
                      <div
                        className={
                          purpose === "Sale"
                            ? `${styles.sale}`
                            : purpose === "Rent"
                            ? `${styles.rent}`
                            : `${styles.shortlet}`
                        }
                      >
                        {purpose}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
