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
// page comes from the URL (?page=1, ?page=2, etc.)
const fetchUsers = async (page: number): Promise<User[]> => {

  // Call API with pagination
  // _page = page number
  // _limit = users per page
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

  // useSearchParams lets us:
  // - READ query params from URL
  // - UPDATE query params in URL
  const [searchParams, setSearchParams] = useSearchParams()

  // Read "page" from the URL
  // Example: ?page=2 → page = 2
  // If page is missing → default to 1
  const page = Number(searchParams.get("page")) || 1

  // useQuery fetches data
  // It will REFETCH whenever "page" changes
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page], // 🔑 page controls cache & refetch
    queryFn: () => fetchUsers(page), // fetch users for this page
  })
  

  // --------------------
  // 4️⃣ LOADING STATE
  // --------------------
  // While API request is running
  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {/* Skeletons shown instead of real data */}
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  // --------------------
  // 5️⃣ ERROR STATE
  // --------------------
  // If API request fails
  if (isError) {
    return <p className="p-6 text-red-500">Error loading users</p>
  }
  
  // --------------------
  // 6️⃣ UI (SUCCESS STATE)
  // --------------------
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
