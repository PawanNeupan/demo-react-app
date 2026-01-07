import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { Button } from "@/components/ui/button"

// --------------------
// TYPE
// --------------------
type User = {
  id: number
  name: string
  email: string
  website: string
}

// --------------------
// FETCH USERS
// --------------------
const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  return res.json()
}

// --------------------
// UPDATE USER NAME
// --------------------
const updateUserName = async ({ id, name }: { id: number; name: string }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    }
  )
  return res.json()
}

// --------------------
// COMPONENT
// --------------------
const UsersOptimisticUpdate = () => {
  const queryClient = useQueryClient()

  // Fetch users
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })

  // Mutation with optimistic update
  const mutation = useMutation({
    mutationFn: updateUserName,

    // 🔹 Runs BEFORE API call
    onMutate: async ({ id, name }) => {
      // Save old data
      const previousUsers =
        queryClient.getQueryData<User[]>(["users"])

      // Update UI instantly
      queryClient.setQueryData<User[]>(["users"], (old) =>
        old?.map((u) =>
          u.id === id ? { ...u, name } : u
        )
      )

      // Return old data for rollback
      return { previousUsers }
    },

    // 🔹 If API fails → rollback
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        ["users"],
        context?.previousUsers
      )
      alert("Update failed!")
    },

    // 🔹 Sync with server
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      })
    },
  })

  return (
    <div className="p-6 space-y-3">
      <h2 className="text-lg font-bold">
        Optimistic Update (Simple)
      </h2>

      {data?.map((user) => (
        <div key={user.id} className="border p-3">
          <p>{user.name}</p>

          <Button
            size="sm"
            onClick={() =>
              mutation.mutate({
                id: user.id,
                name: user.name + " Edited",
              })
            }
          >
            Edit Name
          </Button>
        </div>
      ))}
    </div>
  )
}

export default UsersOptimisticUpdate






// import { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// // --------------------
// // TYPE DEFINITIONS
// // --------------------

// // Define what a single user object looks like
// type User = {
//   id: number
//   name: string
//   email: string
//   website: string
// }

// // --------------------
// // INITIAL DATA
// // --------------------

// // This is our local list of users (no API needed)
// const initialUsers: User[] = [
//   { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", website: "hildegard.org" },
//   { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv", website: "anastasia.net" },
//   { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", website: "ramiro.info" },
// ]

// // --------------------
// // MAIN COMPONENT
// // --------------------
// const UsersOptimisticLocal = () => {
//   // State to store users list
//   const [users, setUsers] = useState<User[]>(initialUsers)

//   // State to track which user is being updated (for "loading" effect)
//   const [loadingId, setLoadingId] = useState<number | null>(null)

//   // --------------------
//   // FUNCTION TO EDIT NAME
//   // --------------------
//   const editName = (id: number) => {
//     // Save previous users list in case we need to rollback
//     const previousUsers = [...users]

//     // 1️⃣ Optimistic update → update UI immediately
//     setUsers(users.map(u => 
//       u.id === id ? { ...u, name: u.name + " EDITED" } : u
//     ))

//     // 2️⃣ Simulate network request delay
//     setLoadingId(id) // mark user as "updating"
//     setTimeout(() => {
//       // 3️⃣ Simulate failure 50% of the time
//       const failed = Math.random() < 0.5
//       if (failed) {
//         alert("Update failed, rolling back!") // notify user
//         setUsers(previousUsers) // rollback to previous data
//       }
//       // Done updating
//       setLoadingId(null)
//     }, 1000) // 1 second delay
//   }

//   // --------------------
//   // UI RENDER
//   // --------------------
//   if (!users.length) return <p>No users found</p> // fallback if empty

//   return (
//     <div className="p-6 space-y-4">
//       {/* Title */}
//       <h2 className="text-xl font-bold">Optimistic Updates (Local List)</h2>

//       {/* List of users */}
//       {users.map(user => (
//         <Card key={user.id}>
//           <CardContent className="p-4 space-y-2">
//             <p className="font-semibold">{user.name}</p>
//             <p className="text-sm">{user.email}</p>
//             <p className="text-sm text-gray-500">{user.website}</p>

//             {/* Edit Button */}
//             <Button
//               size="sm"
//               onClick={() => editName(user.id)}
//               disabled={loadingId === user.id} // disable while updating
//             >
//               {/* Show loading text if updating */}
//               {loadingId === user.id ? "Updating..." : "Edit Name"}
//             </Button>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }

// export default UsersOptimisticLocal

