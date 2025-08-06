import Articels from "../../Components/Articels/Articels";
import FireSale from "../../Components/FireSale/FireSale";
import Footer from "../../Components/Footer/Footer";
import NewItem from "../../Components/NewItem/NewItem";
import Whyus from "../../Components/Whyus/Whyus";
import { Toaster } from 'react-hot-toast';
import "./Home.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchGiftCards, fetchGiftCardsXbox } from "../../Redux/Slice/GiftCards_Product";
import { fetchConsoles, fetchPsDisk, fetchXboxDisk } from "../../Redux/Slice/DisksData";
import Hero3D from "../../Components/HeroSection/Hero3D";
import GiftCardV2 from "../../Components/Gift_Card/GiftCardV2";
import XboxSection from "../../Components/PsCollection/XboxSection";


function Home() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchGiftCards());
    dispatch(fetchGiftCardsXbox())
    dispatch(fetchPsDisk())
    dispatch(fetchConsoles())
    dispatch(fetchXboxDisk())
  } , [])
  return (
    <>
       <Toaster position="top-left"  reverseOrder={false} />
   
      <Hero3D/>
      <NewItem/>
      <Articels/>
      <GiftCardV2/>
      <Whyus/>
      <XboxSection/>
      <FireSale/>
      <Footer/>
    </>
  );
}
export default Home;
