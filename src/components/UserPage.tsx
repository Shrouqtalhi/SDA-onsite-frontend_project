import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { GiBookCover } from "react-icons/gi";
import { BsEyeglasses } from "react-icons/bs";
import { bookSuccess, getBookData } from "../redux/slices/bookSlice";
import axios from "axios";
import { Link } from "react-router-dom";

export default function UserPage() {
  const dispatch = useDispatch<AppDispatch>();
  const booksContent = useSelector((state: RootState) => state.books);

  useEffect(() => {
    handleGetProducts();
  }, []);

  const handleGetProducts = async () => {
    dispatch(bookSuccess());
    const res = await axios.get("/library/books.json");
    dispatch(getBookData(res.data));
    console.log(res.data);
  };

  return (
    <div>
      {booksContent.isLodnig && <h3> Loading products...</h3>}
      <ul className="books">
        {booksContent.books.map((book) => (
          <li
            key={book.id}
            className={`book ${!book.isAvailable ? "sold-out" : ""}`}
          >
            <img src={book.image} alt={book.title} />
            <span>{!book.isAvailable ? "SOLD OUT" : book.title}</span>
            <div className="user-btn">
              <Link to={`/book/${book.id}`}>
                <button className="more-dtl-btn">
                  <GiBookCover />
                </button>
              </Link>
              <button className="borrow-btn">
                <BsEyeglasses />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
