import { useState, useEffect } from "react"; // React hooks for state and side effects
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Skeleton loader component

// Defining hape of a User object
type User = {
  id: number;
  name: string;
};

// Function to fetch users from API
const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users"); // Fetch API data
  if (!res.ok) { // res=responce
    throw new Error("Network error");
  }
  return res.json(); // return as JSON
};

const Users = () => {
  // State to store fetched users
  const [data, setData] = useState<User[] | null>(null);

  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);

  // State to track error status
  const [isError, setIsError] = useState(false);

  // useEffect runs once after the component mounts
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers(); // Call API function
        setData(users); // Save users to state
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers(); // Call async function
  }, []); // Empty dependency array = run once on mount

  useEffect(() => {
    alert("welcome to user page")
  }, [])
  
  // Render loading state
  if (isLoading) {
    return (
      <div className="p-6 grid gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" /> // Show skeleton placeholders
        ))}
      </div>
    );
  }

  
  if (isError) {
    return <p className="text-red-500 p-6">Failed to load users</p>; // Show error message
  }

  // Render list of users after data is loaded
  return (
    <div className="p-6 grid gap-4">
      {data?.map((user) => (
        <Card key={user.id}>
          <CardContent className="p-4">{user.name}</CardContent> {/* Display user name */}
        </Card>
      ))}
    </div>
  );
};

export default Users; // Export component for use in other files
