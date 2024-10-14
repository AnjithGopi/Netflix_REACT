
import './App.css'
import Navbar from './Components/Navbar/navbar'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/Rowpost'
import {originals,action,comedy,horror, romance,scifi} from "./assets/url"
import Footer from './Components/Footer/footer'



function App() {


  return (
    <>
    <Navbar/>
    <Banner/>
      <RowPost url={originals} title="Netflix Originals"/>
      <RowPost url={scifi} title="scifi" isSmall/>
      <RowPost url={horror} title="horror" isSmall/>
      <RowPost url={action} title="Action" isSmall/>
      <RowPost url={comedy} title="comedy" isSmall/>
      <RowPost url={romance} title="romance" isSmall/>
    <Footer/>
    </>
  )
}

export default App
