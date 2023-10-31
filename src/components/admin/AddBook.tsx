import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook } from '../redux/slices/bookSlice'
import AdminSidebar from './AdminSidebar'
import { Book } from '../type/type'
import { AppDispatch, RootState } from '../redux/store'

const initValue: Book = {
  id: 0,
  image: '',
  title: '',
  description: '',
  authorId: 0,
  isAvailable: true,
  bookCopiesQty: 0
}

export default function AddBook() {
  const dispatch = useDispatch<AppDispatch>()
  const [add, setAdd] = useState<Book>(initValue)
  //   const [auther, setAuther] = useState("");
  //   const [image, setImage] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [authorId, setAuthorId] = useState("");
  //   const [bookCopiesQty, setBookCopiesQty] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdd({ ...add, [name]: value })
  }

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdd({ ...add, [name]: Number(value) })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newBook = {
      id: new Date().getTime(),
      title: add.title,
      autherId: new Date().getTime(),
      description: add.description,
      bookCopiesQty: add.bookCopiesQty,
      image: add.image
    }

    dispatch(addBook(newBook))
    console.log(add)
    setAdd(initValue)
    // console.log(newBook);
  }
  return (
    <div className="main">
      <AdminSidebar />
      <form onSubmit={handleSubmit} className="add-form">
        <h2>Add Book</h2>

        <label htmlFor="title" className="form-lable">
          Book Title:
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={add.title}
          onChange={handleChange}
        />

        <label htmlFor="discription">Book Discription:</label>
        <input
          type="text"
          name="description"
          placeholder="Book Description"
          value={add.description}
          onChange={handleChange}
        />

        <label htmlFor="discription">Book Copies:</label>

        <input
          type="number"
          name="bookCopiesQty"
          placeholder="bookCopiesQty"
          value={add.bookCopiesQty}
          onChange={handleChangeNumber}
        />

        {/* <input
          type="image"
          name="image"
          placeholder="image"
          value={add.image}
          onChange={handleChange}
        /> */}
        <button type="submit" className="add-btn">
          Add Book
        </button>
      </form>
    </div>
  )
}
