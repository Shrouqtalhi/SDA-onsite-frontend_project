import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { useNavigate, useParams } from 'react-router-dom'
import { findBookById } from '../redux/slices/bookSlice'
import { useEffect } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { fetchAuthors } from '../redux/slices/authorsSlice'
import { FaHome } from 'react-icons/fa'

export default function BookById() {
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch: AppDispatch = useDispatch()

  const { isLoading, error, foundBook } = useSelector((state: RootState) => state.books)
  const { authors } = useSelector((state: RootState) => state.authors)

  useEffect(() => {
    dispatch(findBookById(Number(id)))
    dispatch(fetchAuthors()) // Example of another dispatch
  }, [dispatch, id])

  if (error) {
    return <p> {error}</p>
  }
  if (isLoading) {
    return <p> loading ....</p>
  }
  if (foundBook) {
    const author = authors.find((author) => author.id === foundBook.authorId)
    return (
      <div className="book-content-icon">
        <FaHome
          className="home-icon"
          onClick={() => {
            navigate('/')
          }}
        />
        <div className="book-content">
          {foundBook && (
            <>
              <div className="book-discription">
                <h2>{foundBook.title}</h2>
                <div className="book-dtl">
                  <AiOutlineStar />
                  <span> {author && <span> {author.name}</span>}</span>
                </div>
                <span>{foundBook.bookCopiesQty}</span>
                <p>{foundBook.description}</p>
              </div>

              <img src={foundBook.image} alt={foundBook.title} />
            </>
          )}
        </div>
      </div>
    )
  }
  return <h1>Not Found</h1>
}
