import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { Header } from "../components/Header";

const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header/>
          <main className="flex-1">
            <Outlet/>
          </main>
        <Footer/>
      </div>
    </>
  )
}

export default Home;
