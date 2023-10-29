// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../redux/store";

// import {
//   Book,
//   bookSuccess,
//   getBookData,
//   removeBook,
// } from "../redux/slices/bookSlice";
// import axios from "axios";

// export default function AdminDashbord() {
//   const dispatch = useDispatch<AppDispatch>();
//   const booksContent = useSelector((state: RootState) => state.books);

//   useEffect(() => {
//     handleGetProducts();
//   }, []);

//   const handleGetProducts = async () => {
//     dispatch(bookSuccess());
//     const res = await axios.get("/library/books.json");
//     dispatch(getBookData(res.data));
//   };

//   const handleRemoveBook = (book: Book) => {
//     dispatch(removeBook(book));
//   };

//   return (
//     <div className="main">
//       {/* <NewProductWrapper /> */}

//       {booksContent.isLodnig && <h3> Loading products...</h3>}

//       <ul className="books">
//         {booksContent.books.map((book) => (
//           <li key={book.id} className="book">
//             <img src={book.image} alt={book.title} width="50" />
//             <span>{book.title}</span>

//             <button onClick={() => handleRemoveBook(book)}>X</button>
//             {/* <button className="BorrowsBtn">
//                 <AiFillHeart /> Add To Borrows
//               </button> */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import AdminBooks from '../admin/AdminBooks'
import AdminSidebar from '../admin/AdminSidebar'

export default function AdminDashbord() {
  return (
    <div className="main">
      <AdminSidebar />
      <AdminBooks />
    </div>
  )
}
