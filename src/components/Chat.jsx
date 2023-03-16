import MainPage from "./MainPage";
import React, {useEffect, useState} from "react";
import Message from "./Message";
import styles from "../styles/Chat.module.css"
import Ably from 'ably';
import {KEY} from "../utils/connection";


const Chat = ({name, room}) => {

        const [isMainPageVisible, setVisible] = useState(false);
        const [messageStore, setMessageStore] = useState([]);
        const [message, setMessage] = useState('');
        const [ably, setAbly] = useState(null);


        const subscribe = async () => {
            const ably = new Ably.Realtime(KEY);
            setAbly(ably);

            const channel = ably.channels.get(room);
            await channel.subscribe('message', (message) => {
                setMessageStore((prevMessages) => [...prevMessages, message.data]);
            });
            return ably;
        }

        useEffect(() => {
            subscribe()
                .then(data => console.log("Data", data))
                .catch(error => console.log(error));
        }, [room]);

        const sendMessage = async (e) => {
            e.preventDefault();
            const channel = ably.channels.get(room);
            const messagePayload = {message: message, user: name};
            await channel.publish('message', messagePayload);
            setMessage('');
        };


        if (isMainPageVisible) {
            return <MainPage/>
        }

        return (
            <div className={styles.wrap}>
                <div className={styles.header}>
                    <h2>{`Room - ${room}`}</h2>
                    <h2>{`User name - ${name}`}</h2>
                    <button
                        className={styles.left}
                        onClick={() => {
                            setVisible(!isMainPageVisible)
                            ably.close();
                        }}>
                        Left the room
                    </button>
                </div>

                <div className={styles.messages}>
                    <Message messages={messageStore} name={name}/>
                </div>


                <form className={styles.form}>
                    <div className={styles.input}>
                        <input
                            type={"text"}
                            name='message'
                            value={message}
                            placeholder="What do you want to write?"
                            onChange={({target: {value}}) => {
                                setMessage(value)
                            }}
                            autoComplete="off"
                            required=""
                        />
                    </div>

                    <div className="btn btn-lg btn-primary">
                        <input
                            onClick={(event) => {
                                if (message) {
                                    sendMessage(event)
                                        // .then(r => console.log("Data R", r))
                                        .catch(error => console.log(error))
                                } else {
                                    event.preventDefault()
                                }
                            }}
                            className={"btn btn-sm btn-primary"} type="submit" value="Send a message"/>
                    </div>
                </form>
            </div>
        )
    }
;

export default Chat;