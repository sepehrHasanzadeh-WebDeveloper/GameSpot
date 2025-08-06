import { useDispatch, useSelector } from "react-redux";
import { Container, Table } from "react-bootstrap";
import "./UserPanel.css";
import { LuShoppingCart } from "react-icons/lu";
import { addToCart } from "../../Redux/Slice/cart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import favoriteimg from "../../assets/images/favorit.png";
import { MdDeleteOutline } from "react-icons/md";
import { removeFavorite } from "../../Redux/Slice/user";
import { Toaster } from "react-hot-toast";
function FavoritPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store.cart);
  const { favoritProduct, userLogin } = useSelector((store) => store.User);

  const addToCartHandler = (item) => {
    if (userLogin === false) {
      Swal.fire({
        title: "اخطار",
        text: "لطفاً ابتدا وارد حساب کاربری شوید",
        icon: "warning",
      });
      navigate("/Submit");
      return;
    }

    const alreadyInCart = products.some(
      (p) => p.id === item._id || p.id === item.id
    );

    if (alreadyInCart) {
      Swal.fire({
        title: "محصول قبلاً به سبد خرید اضافه شده",
        icon: "warning",
      });
      return;
    }

    dispatch(
      addToCart({
        id: item._id || item.id,
        name: item.title || item.name,
        price: item.price,
        quantity: 1,
        image: item.imgurl || item.image,
        type: item.type,
        value: item.value,
        option1: item.option1,
        option2: item.option2,
        option3: item.option3,
        category: item.category,
      })
    );

    Swal.fire({
      title: "کالا با موفقیت به سبد خرید اضافه شد ",
      icon: "success",
    });
  };
  const deletFromFav = (e) => {
    dispatch(removeFavorite(e));
  };
  return (
    <>
      {favoritProduct.length > 0 ? (
        <Container className="container-witlist">
          <Toaster position="top-center" reverseOrder={false} />
          <Table
            hover
            style={{ border: "0", borderRadius: "15px", overflow: "hidden" }}
            className="rounded-table"
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: "var(--border)" }}>تصویر</th>
                <th>نام کالا</th>
                <th>مدل</th>
                <th>موجودی در انبار</th>
                <th>قیمت واحد</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {favoritProduct.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img className="img-product" src={item.image} alt="*" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.title}</td>
                  <td>
                    <p>{item.stock == 0 ? "مجود نیست " : "موجود در انبار"}</p>
                  </td>
                  <td>
                    <p>{item.price.toLocaleString()}</p>
                  </td>
                  <td className="option">
                    <LuShoppingCart
                      className="icon-cart"
                      onClick={() => addToCartHandler(item)}
                    />
                    <MdDeleteOutline
                      onClick={() => deletFromFav(item.id)}
                      className="icon-delet"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      ) : (
        <div className="empty-favorite">
          <p>لیست دلخواه شما خالی است</p>
          <img src={favoriteimg} className="favorite-img" alt="" />
        </div>
      )}
    </>
  );
}
export default FavoritPage;
