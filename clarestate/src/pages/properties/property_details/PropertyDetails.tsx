import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BsBookmarkPlus,
  BsInfoCircle,
  BsInfoLg,
  BsPatchCheckFill,
  BsTelephoneForwardFill,
} from "react-icons/bs";
import { AiOutlineCalendar, AiFillTags } from "react-icons/ai";
import { IoLocation } from "react-icons/io5";
import { TbListDetails } from "react-icons/tb";
import { RiAdminLine } from "react-icons/ri";
import { GrAdd } from "react-icons/gr";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  MdBookmarkAdd,
  MdOutlineAlternateEmail,
  MdOutlineDeleteForever,
  MdOutlineRealEstateAgent,
  MdOutlineSubject,
} from "react-icons/md";
import { BiChevronsRight } from "react-icons/bi";
import { MdMoreTime, MdSwipe } from "react-icons/md";
import { FaUser, FaRegEdit } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import StarsRating from "react-star-rate";

import styles from "./propertyDetails.module.scss";
// import GoBack from "../utilities/GoBack";
// import SimilarProducts from "./SimilarProducts";
// import Comments from "./Comments";
// import admin1 from "../../assets/sade.jpeg";
// import admin2 from "../../assets/logo.jpg";
// import Footer from "../footer/Footer";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader, ClipLoader } from "react-spinners";
import ReactWhatsapp from "react-whatsapp";
// import { SAVE_URL } from "../../redux/slice/authSlice";
import moment from "moment";
import { useQuery } from "react-query";
import axios from "axios";
import { server_url } from "../../../utils/junk";
import Comments from "../../../components/properties/comments/Comments";
import Loader from "../../../utils/Loader";
import { TiUserAddOutline } from "react-icons/ti";
import Notiflix from "notiflix";
import {
  getUser,
  getUserToken,
  selectIsLoggedIn,
} from "../../../redux/slices/auth_slice";
import { errorToast } from "../../../utils/alerts";
import { createReview, removeReview } from "../../../services/review_service";

export default function PropertyDetail() {
  const { slug } = useParams();
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [revLoading, setRevLoading] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const form = useRef();
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | undefined>(0);
  const [review, setReview] = useState("");
  const [showInput, setShowInput] = useState(false);
  //   const [copied, setCopied] = useState(false);
  const [storedBookmarks, setStoredBookmarks] = useState(null);
  const [fixPropName, setFixPropName] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token: any = useSelector(getUserToken);
  const currentUser: any = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     setMessage(
  //       `I am interested in ${property?.name} with Reference ID of ${
  //         property?.id
  //       }, which goes for NGN${formatCurrency(property?.price)}/night...`
  //     );
  //   }, [property?.name, property?.id, property?.price, formatCurrency]);

  //   useEffect(() => {
  //     if (copied) {
  //       setAlert("Reference ID copied to clipboard");
  //       window.setTimeout(() => {
  //         setAlert("");
  //       }, 4000);
  //     }
  //   }, [copied]);

  const url = window.location.href;

  const fetchProperties = async () => {
    return await axios.get(`${server_url}/api/properties/${slug}`);
  };

  const { data, isLoading, refetch } = useQuery("properties", fetchProperties, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  const property = data?.data.property;

  const addReview = async () => {
    if (!isLoggedIn) {
      errorToast("You have to be logged in to add reviews", "addreverror");
      navigate("/auth/login");
      return;
    } else if (!review) {
      return errorToast("Please add your review", "addreverror2");
    } else if (!rating) {
      return errorToast("Please leave a rating", "addrateerror");
    }

    const revData = {
      review,
      rating,
    };

    try {
      setRevLoading(true);
      await createReview(revData, property._id, token);
      refetch();
      setReview("");
      setRating(0);
      setRevLoading(false);
      setShowInput(false);
    } catch (error) {
      setRevLoading(false);
      console.log(error);
    }
  };

  const deleteReview = async (revewID: string) => {
    try {
      setDelLoading(true);
      await removeReview(revewID, token);
      refetch();
      setDelLoading(false);
    } catch (error) {
      setDelLoading(false);
      console.log(error);
    }
  };

  const confirmDelete = (revewID: string) => {
    Notiflix.Confirm.show(
      "Delete Review",
      "Are you sure you want to delete your review?",
      "DELETE",
      "CLOSE",
      function okCb() {
        deleteReview(revewID);
      },
      function cancelCb() {},
      {
        width: "320px",
        borderRadius: "5px",
        titleColor: "rgb(18, 140, 200)",
        okButtonBackground: "rgb(18, 140, 200)",
        cssAnimationStyle: "zoom",
      }
    );
  };

  if (!property) {
    return <Loader />;
  }

  return (
    <>
      <div className={styles["popup"]}></div>
      <section
        className={styles["property__details"]}
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // transition={{ delay: 0.1 }}
      >
        {/* <GoBack /> */}
        <div className={styles["contacts__bottom__wrapper"]}>
          <div className={styles["contacts__bottom"]}>
            <div className={styles["single__item"]}>
              {/* <img src={admin2} alt={adminUserTwo[0]?.lastName} /> */}
              {/* <ReactWhatsapp
                number="234-905-201-4239"
                message={`Hi, i am from Ary Homes website, i want to make an inquiry about ${property.name}...`}
                className="whatsapp"
              >
                <span>MESSAGE</span>
              </ReactWhatsapp> */}
            </div>
            <div className={styles["single__item"]}>
              {/* <img src={admin1} alt={adminUserOne[0]?.lastName} /> */}
              {/* <ReactWhatsapp
                number="234-816-894-5509"
                message={`Hi, i am from Ary Homes website, i want to make an inquiry about ${property.name}...`}
                className="whatsapp"
              >
                <span>MESSAGE</span>
              </ReactWhatsapp> */}
            </div>
          </div>
        </div>

        <p className={styles["details__links"]}>
          <Link to="/">Home</Link>
          <BiChevronsRight /> <span>{property?.name}</span>
        </p>

        <div className={styles["property__details__contents"]}>
          <div className={styles["left__contents"]}>
            <div className={styles["property__details__images"]}>
              {property?.images.map((image: string, index: number) => (
                <div key={index}>
                  <p className={styles["image__length"]}>
                    {property.images.indexOf(image) + 1} /{" "}
                    {property.images.length}{" "}
                  </p>
                  <img src={image} alt={property.name} />
                </div>
              ))}
            </div>
            <h3 style={{ cursor: "pointer", fontSize: ".9rem" }}>
              <MdSwipe />
              &nbsp; <b>Swipe to see all {property.images.length} images</b>
            </h3>
            <div
              className={
                fixPropName
                  ? `${styles["left__contents__card"]} ${styles.fix}`
                  : `${styles["left__contents__card"]}`
              }
            >
              <div className={styles["card__name"]}>
                {property && <h2>{property.name}</h2>}
                <p className={styles["property__location"]}>
                  <IoLocation />
                  {property.location}
                </p>
              </div>
              <h3>NGN{new Intl.NumberFormat().format(property.price)}/night</h3>
            </div>
            <div className={styles["other__details"]}>
              <p className={styles["availability__texts"]}>
                <MdBookmarkAdd />
                <b>Availability status:</b>
                <span
                  style={{
                    color:
                      property.availability === "Available"
                        ? `${styles.green}`
                        : `${styles.crimson}`,
                  }}
                >
                  {property.availability}
                </span>
              </p>
              <p>
                <AiOutlineCalendar />
                <b>Date Added:</b> {new Date(property.createdAt).toDateString()}
              </p>

              <p>
                <FaRegEdit />
                <b>Last Updated:</b>{" "}
                {new Date(property.updatedAt).toDateString()}
              </p>

              <span>
                <AiFillTags />
                <b>Ref. ID:</b> {property._id}
              </span>
              {alert && (
                <p
                  className="alert message"
                  style={{ width: "fit-content", height: "1.6rem" }}
                >
                  {alert}
                </p>
              )}
              {/* <CopyToClipboard text={id} onCopy={() => setCopied(true)}>
                <button className="copy__btn">
                  Copy Reference ID to clipboard
                </button>
              </CopyToClipboard> */}
              {property.availability === "Not Available" && (
                <p className={styles["details__warning"]}>
                  <BsInfoCircle />
                  Properties like this that are unavilable can be available at
                  later dates, ensure to keep checking.
                </p>
              )}
            </div>

            <div className={styles["property__features"]}>
              <h2>Features</h2>
              <div className={styles["flex__features"]}>
                {property.features.map((feature: string, index: number) => (
                  <ul key={index}>
                    <li>
                      {/* <TiArrowForwardOutline /> */}
                      <AiFillCheckCircle />
                      {feature}.
                    </li>
                  </ul>
                ))}
              </div>
            </div>
            <div className={styles["property__description"]}>
              <h2>
                <TbListDetails />
                Description
              </h2>
              <p>{property.description}</p>
            </div>

            <Comments propertyID={property._id} slug={property.slug} />
            <div className={styles["save__for__later"]}>
              {alert && (
                <p
                  className={styles.alert}
                  style={{
                    width: "fit-content",
                    fontSize: ".9rem",
                    color: "#ae8625",
                  }}
                >
                  <BsInfoLg />
                  {alert}
                </p>
              )}
              <h3>
                {" "}
                <BsBookmarkPlus />
                Bookmark Property
              </h3>
              <p>
                {" "}
                Wish to save this property to your bookmarks to view later?
                click on the button below...
              </p>
              {loading ? (
                <button className={styles["bookmark__btn"]} disabled>
                  <BeatLoader loading={loading} size={10} color={"#fff"} />
                </button>
              ) : (
                <button
                  //   onClick={() => addToBookmarks(property)}
                  className={styles["bookmark__btn"]}
                >
                  Add to bookmarks
                </button>
              )}
            </div>
          </div>
          <div className={styles["right__contents"]}>
            <div className={styles["contact__info"]}>
              <div className={styles["contact__info__details"]}>
                <h2>
                  <MdOutlineRealEstateAgent style={{ color: "#888" }} />
                  Contact Agent
                </h2>
                <div className={styles.admin}>
                  <p>{property.agentName}</p>
                  <div className={styles.contact}>
                    <a href={`tel:${property.agentContact}`}>
                      <BsTelephoneForwardFill />
                      &nbsp; {property.agentContact}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3>Need to reach out?</h3>
              <form>
                <label>
                  <FaUser />
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Full Name"
                    required
                  />
                </label>
                <label>
                  <MdOutlineAlternateEmail />
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your email"
                    required
                  />
                </label>
                <label>
                  <MdOutlineSubject />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject, e.g Enquiry about a property"
                    required
                  />
                </label>
                <label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    cols={0}
                    rows={6}
                    required
                  ></textarea>
                </label>
                {loading ? (
                  <button
                    type="button"
                    disabled
                    className={styles["property__message__btn"]}
                  >
                    <BeatLoader loading={loading} size={10} color={"#fff"} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={styles["property__message__btn"]}
                  >
                    SEND MESSAGE
                  </button>
                )}
              </form>
              <p>
                By proceeding, you consent to receive texts at the email you
                provided. We promise not to spam you.
              </p>
            </div>
            <br />
            <div className={styles["rev__wrapper"]}>
              <div className={styles["rev__head"]}>
                <h1>Reviews</h1>
                <span>
                  <TiUserAddOutline
                    onClick={() => setShowInput(!showInput)}
                    color="rgb(18, 140, 200)"
                    size={22}
                  />
                </span>
              </div>
              {showInput ? (
                <div className={styles["add_rev"]}>
                  <StarsRating
                    value={rating}
                    onChange={(rating) => {
                      setRating(rating);
                    }}
                  />
                  <textarea
                    //@ts-ignore
                    cols="2"
                    //@ts-ignore
                    rows="2"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                  {revLoading ? (
                    <button disabled>Processing...</button>
                  ) : (
                    <button onClick={addReview}>Add review</button>
                  )}
                </div>
              ) : null}

              {property.reviews.length > 0 ? (
                property.reviews?.map((customerReview: any, index: number) => {
                  const { rating, review, user, createdAt, _id } =
                    customerReview;

                  return (
                    <div key={_id} className={styles.reviews}>
                      <div className={styles.reviewer}>
                        <img src={user?.photo} alt={user?.first_name} />
                        <div>
                          <b>{`${user?.first_name} ${user?.last_name}`}</b>
                          <br />
                          <span className={styles.desc}>
                            <b>{moment(createdAt).fromNow()}</b>
                          </span>{" "}
                          {currentUser?._id === user._id && (
                            <span
                              className={styles["del__rev"]}
                              onClick={() => confirmDelete(_id)}
                            >
                              {delLoading ? (
                                <ClipLoader
                                  loading={delLoading}
                                  //@ts-ignore
                                  size={12}
                                  className={styles.FadeLoader}
                                  color="crimson"
                                />
                              ) : (
                                <MdOutlineDeleteForever color="crimson" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <StarRatings
                          rating={rating}
                          starDimension="20px"
                          starRatedColor="gold"
                          starSpacing="0px"
                        />
                        <div className={styles.review}>
                          <span>{review}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <h3>No reviews for this property yet.</h3>
              )}
            </div>
            {/* <SimilarProducts /> */}
          </div>
        </div>
        {/* <Footer /> */}
      </section>
    </>
  );
}
