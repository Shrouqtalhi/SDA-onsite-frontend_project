import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";

export default function Sidebar() {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const booksContent = useSelector((state: RootState) => state.books);
  const handleClick = (icon: string) => {
    setActiveButton(icon);
  };

  const handleSearch = () => {
    const filteredBooks = booksContent.books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filteredBooks);
  };
  return (
    <nav className="sidebar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search books..."
      />
      ;
      <ImSearch
        className={activeButton === "search" ? "active" : ""}
        onClick={() => handleClick("search")}
      />
      <Link to="/">
        <FaHome
          className={activeButton === "home" ? "active" : ""}
          onClick={() => handleClick("home")}
        />
      </Link>
      <Link to="/login">
        <FaUser
          className={activeButton === "user" ? "active" : ""}
          onClick={() => handleClick("user")}
        />
      </Link>
    </nav>
  );
}
