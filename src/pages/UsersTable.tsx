// React Router hook to READ and UPDATE values in the URL
// Example URL: /users?page=2
import { useSearchParams } from "react-router-dom"

// React Query hook for fetching + caching API data
import { useQuery } from "@tanstack/react-query"

// UI components (pre-styled)
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// --------------------
// 1️⃣ TYPES (TypeScript)
// --------------------
// Shape of ONE user coming from the API
type User = {
  id: number
  name: string
  email: string
}

// --------------------
// 2️⃣ API FUNCTION
// --------------------
// This function fetches users based on PAGE NUMBER

const fetchUsers = async (page: number): Promise<User[]> => {

  // Call API with pagination
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=2`
  )

  // If API request fails → throw error
  if (!res.ok) {
    throw new Error("Failed to fetch users")
  }

  // Convert response to JSON and return it
  return res.json()
}

// --------------------
// 3️⃣ COMPONENT
// --------------------
const UsersTable = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const page = Number(searchParams.get("page")) || 1


  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page], // 🔑 page controls cache & refetch
    queryFn: () => fetchUsers(page), // fetch users for this page
  })
  

  
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  if (isError) {
    return <p className="p-6 text-red-500">Error loading users</p>
  }
  

  return (
    <div className="p-6 space-y-4">

      {/* Show current page number */}
      <h2 className="text-xl font-bold">
        Users (Page {page})
      </h2>

      {/* USER LIST */}
      {data?.map((user) => (
        <Card key={user.id}>
          <CardContent className="p-4">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </CardContent>
        </Card>
      ))}

      {/* PAGINATION BUTTONS */}
      <div className="flex gap-4">

        {/* PREVIOUS PAGE BUTTON */}
        <Button
          disabled={page === 1} // Disable if already on page 1
          onClick={() =>
            // Update URL → ?page=page-1
            // This triggers useQuery refetch automatically
            setSearchParams({ page: String(page - 1) })
          }
        >
          Previous
        </Button>

        {/* NEXT PAGE BUTTON */}
        <Button
        disabled={!data || data.length === 0}
          onClick={() =>
            // Update URL → ?page=page+1
            setSearchParams({ page: String(page + 1) })
          }
        >
          Next
        </Button>

      </div>

    </div>
  )
}

// Export component
export default UsersTable
