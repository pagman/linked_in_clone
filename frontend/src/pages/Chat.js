import React, { useState } from "react";
import { useEffect } from "react";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../config";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Button from "@mui/material/Button";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import axios from "axios";

const DATA = [];

function Chat() {
  const navigate = useNavigate();
  const [messages, setmessages] = React.useState([]);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [active, setActive] = React.useState([]);
  const [receiver, setReceiver] = useState("");

  const handleToggle = (value) => () => {
    setReceiver(value);
    console.log(value);
  };

  function loadUnread(data) {
    setmessages(data);
    console.log(messages);
  }

  function loadActive(data) {
    setActive(data);
    console.log(active);
  }

  let { id } = useParams();
  function handleSend(x) {
    // Logger user (sender)
    console.log(x);
    DATA.push({
      key: DATA.length + 1,
      message: x,
      direction: "outgoing",
      position: "single",
    });
    setMessageInputValue("");
    if (parseInt(id.split("A")[0]) !== 0) {
      axios
        .post(
          "https://localhost:8000/message/",
          {
            receiver_id: parseInt(id.split("A")[0]),
            message: x,
          },
          {
            headers: { token: global.config.user.token },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    if (parseInt(receiver) !== 0) {
      axios
        .post(
          "https://localhost:8000/message/",
          {
            receiver_id: parseInt(receiver),
            message: x,
          },
          {
            headers: { token: global.config.user.token },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }

  useEffect(() => {
    axios
      .get("https://localhost:8000/unread-messages/", {
        headers: { token: global.config.user.token },
      })
      .then((res) => {
        loadUnread(res.data);
      })
      .catch(console.log);

    axios
      .get("https://localhost:8000/active-conversations/", {
        headers: { token: global.config.user.token },
      })
      .then((res) => {
        loadActive(res.data);
      })
      .catch(console.log);
  }, []);

  // if (messages === []) return <div>Loading...</div>;
  // if (active === []) return <div>Loading...</div>;

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <div>sender id {id.split("A")[0]}</div>
      <div>receiver id {id.split("A")[1]}</div>
      <div>receiver id: {receiver}</div>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {DATA.map((item) => (
              <Message model={item} />
            ))}
          </MessageList>
          <MessageInput
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => handleSend(messageInputValue)}
          />
        </ChatContainer>
      </MainContainer>
      <div> You have {messages.length} unread messages</div>

      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {messages.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <ListItem
              key={value.id}
              secondaryAction={
                <IconButton edge="end" aria-label="comments"></IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value.sender_id)}
                dense
              >
                <ListItemText
                  id={labelId}
                  primary={
                    "User: " + value.sender_id + " says: " + value.message
                  }
                />
              </ListItemButton>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  axios
                    .delete("https://localhost:800/delete-message/"+value.id+"/", {
                      headers: { token: global.config.user.token },
                    })
                    .then((res) => {
                      console.log(res.data);
                    })
                    .catch(console.log);
                    navigate('/chat/0')
                }}
              >
                Delete
              </Button>
            </ListItem>
          );
        })}
      </List>

      <div> Active Conversations {active.length} </div>

      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {active.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;

          return (
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <CommentIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value.id)}
                dense
              >
                <ListItemText
                  id={labelId}
                  primary={"User: " + value.username}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

export default Chat;
