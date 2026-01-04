
import { useQueries } from "@tanstack/react-query"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// User data structure coming from /users API
type User = {
  id: number
  name: string
}

// Todo data structure coming from 
type Todo = {
  id: number
  userId: number
  completed: boolean
}

// Final shape we want in UI

type UserWithTodoCount = {
  id: number
  name: string
  todoCount: number
}



const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")

  // If error
  if (!res.ok) {
    throw new Error("Failed to fetch users")
  }

  // Convert response to JSON
  return res.json()
}


const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos")

  if (!res.ok) {
    throw new Error("Failed to fetch todos")
  }

  return res.json()
}

type StatCardProps = {
  title: string
  value: number
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}


const UsersWithStats = () => {

  // useQueries allows multiple queries at once
  const results = useQueries({
    queries: [
      {
        queryKey: ["users"],   // cache key
        queryFn: fetchUsers,   // fetch users
      },
      {
        queryKey: ["todos"],   // cache key
        queryFn: fetchTodos,   // fetch todos
      },
    ],
  })

  // Extract individual query results
  const usersQuery = results[0]
  const todosQuery = results[1]

  // ===============================
  // 5️⃣ LOADING STATE
  // ===============================

  // skeleton
  if (usersQuery.isLoading || todosQuery.isLoading) {
    return (
      <div className="p-6 grid gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }


  // If ANY request failed
  if (usersQuery.isError || todosQuery.isError) {
    return <p className="text-red-500 p-6">Failed to load data</p>
  }

  
  // Get actual data safely
  const users = usersQuery.data ?? []
  const todos = todosQuery.data ?? []

  // Merge users with their active todo count
  const usersWithTodoCount: UserWithTodoCount[] = users.map((user) => {

    // Count todos for THIS user that are NOT completed
    const count = todos.filter(
      (todo) => todo.userId === user.id && !todo.completed
    ).length

    // Return transformed user object
    return {
      id: user.id,
      name: user.name,
      todoCount: count,
    }
  })

  // Total number of users
  const totalUsers = users.length

  // Total unfinished tasks
  const activeTasks = todos.filter(
    (todo) => !todo.completed
  ).length

  return (
    <div className="p-6 space-y-6">

      <div className="grid grid-cols-2 gap-4">
        <StatCard title="Total Users" value={totalUsers} />
        <StatCard title="Active Tasks" value={activeTasks} />
      </div>

      <div className="grid gap-4">
        {usersWithTodoCount.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4 flex justify-around">
              <span>
                {user.id}. {user.name}
              </span>
              <span className="text-sm text-gray-500">
                Active Todos: {user.todoCount}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}

export default UsersWithStats
