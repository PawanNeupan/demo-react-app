import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type User = {
  id: number;
  name: string;
};

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Network error");
  }
  return res.json();
};

const Users = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 grid gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return <p className="text-red-500 p-6">Failed to load users</p>;
  }

  return (
    <div className="p-6 grid gap-4">
      {data?.map((user) => (
        <Card key={user.id}>
          <CardContent className="p-4">
            {user.name}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Users;
