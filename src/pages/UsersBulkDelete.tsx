import { useEffect, useState } from "react"
import DataTable from "./DataTable"
import { Button } from "@/components/ui/button"
import { TableRow, TableCell } from "@/components/ui/table"

type User = {
  id: number
  name: string
  email: string
}

const UsersBulkDelete = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selected, setSelected] = useState<number[]>([])

  // Fetch users
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  // Select / unselect user
  const toggleUser = (id: number) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    )
  }

  // Bulk delete
  const bulkDelete = async () => {
    await Promise.all(
      selected.map(id =>
        fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`,
          { method: "DELETE" }
        )
      )
    )

    // Remove from UI
    setUsers(users.filter(u => !selected.includes(u.id)))
    setSelected([])
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Users</h2>

      {/* Show button ONLY if something is selected */}
      {selected.length > 0 && (
        <Button variant="destructive" onClick={bulkDelete}>
          Delete Selected ({selected.length})
        </Button>
      )}

      {/* Reusable table */}
      <DataTable
        data={users}
        renderRow={(user: User) => (
          <TableRow key={user.id}>
            <TableCell>
              <input
                type="checkbox"
                checked={selected.includes(user.id)}
                onChange={() => toggleUser(user.id)}
              />
            </TableCell>

            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
        )}
      />
    </div>
  )
}

export default UsersBulkDelete
