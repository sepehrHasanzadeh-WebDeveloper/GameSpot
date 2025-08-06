import { Container } from "react-bootstrap"
import notFoundimg from "../../assets/images/notFound.SVG"
import Meta from "../Helmet/Meta"
function NotFound () {
    return (
        <>
          <Meta
        title="صفحه مورد نظر پیدا نشد | ارور 404 | GameSpot"
        description="متأسفیم! صفحه‌ای که دنبال آن بودید پیدا نشد. لطفاً به صفحه اصلی GameSpot بازگردید یا از منوی سایت استفاده کنید."
      />
        <Container style={{display:"flex" , justifyContent:"center" , alignItems:"center" , flexDirection:"column" , padding:"50px"}}>
            <img style={{width:"400px" , height:"450px"}} src={notFoundimg} className="img-fluid" alt="بازگشت به سایت gameSpot" />
            <p className="text-center fs-3 ">متأسفیم! صفحه‌ای که به دنبال آن هستید، وجود ندارد.</p>
            <p className="text-center " style={{color:"grey" , fontSize:"14px"}} >ممکن است آدرس را اشتباه وارد کرده باشید یا صفحه حذف شده باشد.</p>
            <button className="btn btn-outline-info">بازگشت به صفحه اصلی </button>
        </Container>
        </>
    )
}
export default NotFound