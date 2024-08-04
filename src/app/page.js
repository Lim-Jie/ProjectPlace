import ProductLoader from "./components/ProductLoader";
import Likes from "./components/Likes";
import UpcomingEvents from "./components/UpcomingEvents";

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center w-full ">
      <div className="w-full flex justify-center mt-8">
        <ProductLoader />
        <Likes />
      </div>
    </div>
  );
}


/*
    <UpcomingEvents/>
*/