import React, { useEffect, useState } from "react";
import "./Message.css";
import axios from "axios";
const Message = () => {
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);
  const user = JSON.parse(localStorage.getItem("User"));
  useEffect(() => {
    axios
      .get(`https://localhost:7264/api/TicketComment/TicketComment/Tck0003`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      });
    console.log(user);
  }, []);

  const handleComment = (ticketRefnum) => {
    const addComment = {
      ticketRefnum: ticketRefnum,
      comment: comment,
    };
    axios
      .post(
        `https://localhost:7264/api/TicketComment/TicketComment/${user.id}`,
        addComment
      )
      .then((res) => setComments((prevComment) => [...prevComment, res.data]));
        setComment("")
    console.log(comments);
  };
  return (
    <div className="body">
      <div className="container">
        <section className="chat">
          <div className="header-chat">
            <i className="icon fa fa-user-o" aria-hidden="true"></i>
            <p className="name"> Tck0003 </p>
          </div>
          <div className="messages-chat">
            {comments.map((comment) => {
              if (user.name == comment.commentedBy) {
                return (
                  <div className="message text-only">
                    <div className="response">
                      <p className="text"> {comment.comment}</p>
                    </div>
                    {/* <p className="time"> {comment.commentedOn }</p> */}
                  </div>
                );
              } else {
                return (
                  <div className="message">
                    <p className="text"> {comment.comment}</p>
                    {/* <p className="time">{comment.commentedOn }</p> */}
                  </div>
                );
              }
            })}
          </div>
          {/* <div className="messages-chat">
            <div className="message">
              <p className="text"> Hi, how are you ? </p>
            </div>
            <p className="time"> 14h58</p>
            <div className="message text-only">
              <div className="response">
                <p className="text"> Hey Megan ! It's been a while 😃</p>
              </div>
            </div>
            <div className="message text-only">
              <div className="response">
                <p className="text"> When can we meet ?</p>
              </div>
            </div>
            <p className="response-time time"> 15h04</p>
            <div className="message">
              <p className="text"> 9 pm at the bar if possible 😳</p>
            </div>
            <p className="time"> 15h09</p>
          </div> */}
        </section>
        <div className="footer-chat">
          <input
            type="text"
            className="write-message"
            placeholder="Type your message here"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></input>
          <i
            className="rightArrow fas fa-sharp fa-solid fa-angles-right"
            aria-hidden="true"
            onClick={() => handleComment("Tck0003")}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Message;
