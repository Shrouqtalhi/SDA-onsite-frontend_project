import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link, useParams } from 'react-router-dom'
import { fetchBookById } from '../redux/slices/bookSlice'
import { useEffect } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { fetchAuthors } from '../redux/slices/authorsSlice'
import { FaHome } from 'react-icons/fa'

export default function BookById() {
  const { id } = useParams()
  const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)

  const { isLoading, error, foundBook } = useSelector((state: RootState) => state.books)
  const { authors } = useSelector((state: RootState) => state.authors)

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id))
      dispatch(fetchAuthors())
    }
  }, [dispatch, id])

  if (error) {
    return <p> {error}</p>
  }
  if (isLoading) {
    return <p> loading ....</p>
  }
  if (foundBook) {
    const selectedAuthors = authors.filter((author) => {
      const found = foundBook.authorId.find((currentAuthor) => currentAuthor === author._id)
      return found
    })
    return (
      <div className="book-content-icon">
        {isLoggedIn ? (
          <Link to={`/${userData?.role}/books`}>
            <FaHome className="home-icon" />
          </Link>
        ) : (
          <Link to={`/`}>
            <FaHome className="home-icon" />
          </Link>
        )}

        <div className="book-content">
          {foundBook && (
            <>
              <div className="book-discription">
                <h2>{foundBook.title}</h2>
                <div className="book-dtl">
                  <span className="home-icon">
                    By{' '}
                    {selectedAuthors.length > 0 && (
                      <span className="home-icon">
                        {' '}
                        {selectedAuthors.map((author) => author.name).join(', ')}
                      </span>
                    )}
                  </span>
                </div>
                <div className="home-icon">
                  <AiOutlineStar />
                  4.5
                </div>
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
