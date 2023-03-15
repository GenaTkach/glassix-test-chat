import React, {useEffect} from 'react';
import styles from "../styles/Messages.module.css"


const Message = ({messages, name}) => {
        return (
            <div className={styles.messages}>
                {messages.map((msg, index) => {
                    return (
                        <div>
                            <div className={styles.user} key={index}>{name}</div>
                            <div className={styles.text} key={index}>{msg}</div>
                            <br/>
                        </div>
                    )
                })
                }
            </div>
        );
    }
;

export default Message;