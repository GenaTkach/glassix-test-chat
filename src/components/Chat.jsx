import MainPage from "./MainPage";
import {useState} from "react";
import Message from "./Message";
import styles from "../styles/Chat.module.css"


const Chat = ({name}) => {


    const [isMainPageVisible, setVisible] = useState(false);
    const [state, setState] = useState([]);
    const [message, setMessage] = useState('');


    if (isMainPageVisible) {
        return <MainPage/>
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!message) return;
        setMessage("");
    }

    return (
        <div>
            <div>
                <button
                    className={styles.left}
                    onClick={() => setVisible(!isMainPageVisible)}>Left the room
                </button>
            </div>

            <div className={styles.messages}>
                <Message messages={state} name={name}/>
            </div>


            <form className={styles.form} onSubmit={handleSubmit}>
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

                <div className={styles.button}>
                    <input
                        onClick={() => setState((state) => [...state, message])}
                        type="submit" value="Send a message"/>
                </div>
            </form>
        </div>
    )
        ;
};

export default Chat;