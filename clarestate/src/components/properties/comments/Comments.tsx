import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCommentMedical, FaUserEdit } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { BiDotsHorizontal } from "react-icons/bi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import styles from "./comments.module.scss";
import { useQuery } from "react-query";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import { server_url } from "../../../utils/junk";
import {
  getUser,
  getUserToken,
  SAVE_URL,
  selectIsLoggedIn,
} from "../../../redux/slices/auth_slice";
import { errorToast } from "../../../utils/alerts";
import { createComment } from "../../../services/comments_service";

interface idType {
  propertyID: string;
  slug: string;
}

export default function Comments({ propertyID, slug }: idType) {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser: any = useSelector(getUser);
  const token: any = useSelector(getUserToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchComments = async () => {
    return await axios.get(
      `${server_url}/api/properties/${propertyID}/comments`
    );
  };

  const { data, isLoading, error } = useQuery("comments", fetchComments, {
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const comments = data?.data.comments;
  console.log(comments);

  const wrapper = showComments
    ? `${styles["comments__section__details"]}`
    : `${styles["comments__section__details"]} ${styles["reduce__height"]}`;
  const contents = showComments ? null : `${styles.hide}`;

  const hanndleShowComments = () => {
    setShowComments(!showComments);
    setShowCommentForm(false);
  };

  const handleClose = () => {
    setShowCommentForm(false);
  };

  const url = window.location.href;

  const handleCommentForm = () => {
    if (!isLoggedIn) {
      dispatch(SAVE_URL(url));
      navigate("/auth/login");
      setLoading(false);
      setComment("");
      errorToast("You have to be logged in to add comments", "unauthcomm");
    } else {
      setShowCommentForm(true);
    }
  };

  const addComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!comment) window.scrollTo(0, 0);
    try {
      setLoading(true);
      await createComment(propertyID, { comment }, token);
      setShowCommentForm(false);
      setComment("");
      window.scrollTo(0, 0);
     setTimeout(() => location.assign(`/property/${slug}`), 1500)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles["comments__section"]}>
      <div className={wrapper}>
        <h2 onClick={hanndleShowComments}>
          <span>
            <GoCommentDiscussion />
            COMMENTS ({comments.length})
          </span>

          <div onClick={hanndleShowComments} className={styles["toggle__icon"]}>
            {showComments ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </h2>
        {comments.length === 0 ? (
          <>
            <p className={`${styles["toggle__icon"]} ${contents}`}>
              Be the first to add a comment
            </p>
            {!showComments ? (
              <button
                className={`${styles.cb} ${styles["add__comment__btn__none"]} ${contents}`}
                onClick={handleCommentForm}
              >
                Add a comment
              </button>
            ) : null}
          </>
        ) : (
          comments.map((com: any, index: number) => {
            const { comment, user, createdAt } = com;
            return (
              //@ts-ignore
              <ul key={index} className={contents}>
                <li>
                  <p>{comment}</p>
                  <br />
                  <div className={styles["comment__name"]}>
                    <FaUserEdit /> {`${user.first_name} ${user.last_name}`}
                  </div>
                  <div className={styles["comment__date"]}>
                    <MdOutlineDateRange />
                    {new Date(createdAt).toDateString()}
                  </div>
                  {currentUser._id === user._id && (
                    <h3>You added this comment</h3>
                  )}
                </li>
              </ul>
            );
          })
        )}
        {showComments && (
          <button
            className={`${styles.cb} ${styles["add__comment__btn"]}`}
            onClick={handleCommentForm}
          >
            Add a comment
          </button>
        )}

        <form
          onSubmit={addComment}
          //@ts-ignore
          style={{ display: showCommentForm ? null : "none" }}
        >
          <h2>
            <FaCommentMedical />
            Add a comment
          </h2>

          <label>
            <span>Your comment</span>
          </label>
          <textarea
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your Comment"
            //@ts-ignore
            cols=""
            //@ts-ignore
            rows="8"
          />
          {loading ? (
            <button
              type="submit"
              className={styles["submit__comment__btn"]}
              disabled
            >
              <BeatLoader loading={loading} size={10} color={"#fff"} />
            </button>
          ) : (
            <button type="submit" className={styles["submit__comment__btn"]}>
              Submit comment
            </button>
          )}

          <button
            onClick={handleClose}
            type="button"
            className={styles["close__comment__btn"]}
          >
            Close comment
          </button>
        </form>
      </div>
    </div>
  );
}