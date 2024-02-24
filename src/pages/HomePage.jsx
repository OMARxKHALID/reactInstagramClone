import Header from "../components/Header";
import SideBar from "../components/Sidebar";
import Stories from "../components/Stories"
import Posts from "../components/Posts"
import OtherSide from '../components/OtherSide'
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow flex">
        <div className="w-1/4">
          <SideBar />
        </div>
        <div className="w-3/5 flex flex-col  xl:-mt-8 items-center">
          <Stories />
          <Posts />
        </div>
        <div className="w-1/4 xl:-mt-8">
          <OtherSide />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
