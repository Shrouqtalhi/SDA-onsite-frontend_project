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
