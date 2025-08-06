import "./MsgCard.css";
function MsgCard({ firstName, lastName, email }) {
  return (
    <>
      <div className="msgCard-parent">
        <p>نام : {firstName} </p>
        <p>نام خانوادگی : {lastName} </p>
        <p>{email}</p>

        <button className="see-msg">مشاهده پیام </button>
      </div>
    </>
  );
}
export default MsgCard;
