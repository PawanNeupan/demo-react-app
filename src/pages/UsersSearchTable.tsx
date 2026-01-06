// --------------------
// IMPORTS
// --------------------
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebounce } from "@/hooks/useDebounce"

// --------------------
// TYPE DEFINITIONS
// --------------------
type User = {
  id: number
  name: string
  email: string
  website: string
}

// --------------------
// API FUNCTION
// --------------------
// Fetch all users at once
const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
  if (!res.ok) throw new Error("Failed to fetch users")
  const users: User[] = await res.json()
  return users
}

// --------------------
// COMPONENT
// --------------------
const UsersSearchTable = () => {
  // --------------------
  // 1️⃣ URL STATE
  // --------------------
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const search = searchParams.get("search") || ""
  const domain = searchParams.get("domain") || ""

  // Debounce search to avoid API spamming
  const debouncedSearch = useDebounce(search, 500)

  // --------------------
  // 2️⃣ FETCH ALL USERS
  // --------------------
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    placeholderData: [],
  })

  // --------------------
  // 3️⃣ FILTER & PAGINATION (CLIENT-SIDE)
  // --------------------
  const filteredUsers = users
    ?.filter(user => user.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .filter(user => (domain ? user.website.endsWith(domain) : true)) ?? []

  const usersPerPage = 3
  const start = (page - 1) * usersPerPage
  const paginatedUsers = filteredUsers.slice(start, start + usersPerPage)

  const disableNext = start + usersPerPage >= filteredUsers.length

  // --------------------
  // 4️⃣ LOADING STATE
  // --------------------
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  // --------------------
  // 5️⃣ ERROR STATE
  // --------------------
  if (isError) {
    return <p className="p-6 text-red-500">Error loading users</p>
  }

  // --------------------
  // 6️⃣ UI
  // --------------------
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h2 className="text-xl font-bold">Users Search (Page {page})</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={e =>
          setSearchParams({
            page: "1", // reset page when search changes
            search: e.target.value,
            domain,
          })
        }
        className="border p-2 w-full rounded"
      />

      {/* Domain Filter */}
      <select
        value={domain}
        onChange={e =>
          setSearchParams({
            page: "1", // reset page when filter changes
            search,
            domain: e.target.value,
          })
        }
        className="border p-2 rounded"
      >
        <option value="">All Domains</option>
        <option value=".com">.com</option>
        <option value=".net">.net</option>
        <option value=".org">.org</option>
        <option value=".info">.info</option>
        <option value=".biz">.biz</option>
        <option value=".io">.io</option>
      </select>

      {/* User List */}
      {paginatedUsers.length === 0 && (
        <p className="text-gray-500">No users found</p>
      )}
      {paginatedUsers.map(user => (
        <Card key={user.id}>
          <CardContent className="p-4">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
            <p className="text-sm text-gray-500">{user.website}</p>
          </CardContent>
        </Card>
      ))}

      {/* Pagination Buttons */}
      <div className="flex gap-4">
        <Button
          disabled={page === 1}
          onClick={() => setSearchParams({ page: String(page - 1), search, domain })}
        >
          Previous
        </Button>
        <Button
          disabled={disableNext}
          onClick={() => setSearchParams({ page: String(page + 1), search, domain })}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default UsersSearchTable
