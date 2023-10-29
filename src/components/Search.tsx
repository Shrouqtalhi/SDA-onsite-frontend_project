import React, { ChangeEvent } from 'react'
import { searchBook } from '../redux/slices/bookSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export default function Search() {
  const { search } = useSelector((state: RootState) => state.books)

  const dispatch = useDispatch()
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchBook(e.target.value))
  }
  return (
    <div className="search-input">
      <p>Se</p>
      <input type="text" value={search} onChange={handleSearch} className="" />
      <p>|rch</p>
    </div>
  )
}
