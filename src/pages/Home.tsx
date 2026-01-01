import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

const Home = () => {
  const [count, setCount] = useState(0); // state for counter

  // function to handle button click
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="flex justify-center pb-5">
      <div className="flex flex-col justify-center items-center mt-10 gap-6">
        
        <Card className="w-96">
          <CardContent className="text-center">
            <h1 className="text-3xl font-bold">Welcome to Home Page</h1>
          </CardContent>
        </Card>

      
        <Card className="w-96">
          <CardContent className="text-center">
            <h1 className="text-3xl font-bold mb-4">Counter</h1>
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              You pressed me {count} times
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
