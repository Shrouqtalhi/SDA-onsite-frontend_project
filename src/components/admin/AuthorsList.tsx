import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { TbHttpDelete } from 'react-icons/tb'
import { PiNotePencilBold } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import { fetchAuthors, removeAuthor } from '../redux/slices/authorsSlice'
import { Author } from '../type/type'
import { BiPencil } from 'react-icons/bi'

export default function AuthersList() {
  const dispatch: AppDispatch = useDispatch()
  const { authors, isLoading, error } = useSelector((state: RootState) => state.authors)

  useEffect(() => {
    dispatch(fetchAuthors())
  }, [dispatch])

  const handleAuthorDelete = (id: Author) => {
    dispatch(removeAuthor(id))
  }
  return (
    <div className="main">
      <AdminSidebar />
      {isLoading && <h3> Loading Authors...</h3>}
      {error && <h3> {error}</h3>}
      <div className="list-of-users">
        <h2>
          <BiPencil />
          List of Authors..
        </h2>
        <ul className="user">
          {authors.length > 0 &&
            authors.map((author) => (
              <h4 key={author.id}>
                <p>{author.name}</p>
                <div className="user-btn">
                  <Link to={`/book/${author.id}`}>
                    <button className="more-dtl-btn">
                      <PiNotePencilBold />
                    </button>
                  </Link>
                  <button className="delete" onClick={() => handleAuthorDelete(author)}>
                    <TbHttpDelete />
                  </button>
                </div>
              </h4>
            ))}
        </ul>
      </div>
    </div>
  )
}
