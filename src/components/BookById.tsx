import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useParams } from "react-router-dom";
import { findBookById } from "../redux/slices/bookSlice";
import { useEffect } from "react";
import { AiOutlineStar } from "react-icons/ai";

export default function BookById() {
  const bookId = useParams();
  const dispatch = useDispatch();

  const { isLodnig, error, foundBook } = useSelector(
    (state: RootState) => state.books
  );

  useEffect(() => {
    dispatch(findBookById(Number(bookId.id)));
  }, []);

  if (error) {
    return <p> {error}</p>;
  }
  if (isLodnig) {
    return <p> loading ....</p>;
  }
  if (foundBook) {
    return (
      <div className="book-content">
        <div className="book-discription">
          <h2>{foundBook.title}</h2>
          <div className="book-dtl">
            <AiOutlineStar />
            <span>{foundBook.bookCopiesQty}</span>
            <span>{foundBook.authorId}</span>
          </div>
          <p>{foundBook.description}</p>
        </div>

        <img src={foundBook.image} alt={foundBook.title} />
      </div>
    );
  }
  return <h1>Not Found</h1>;
}
