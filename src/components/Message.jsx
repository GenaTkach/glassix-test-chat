import React from 'react';
import styles from "../styles/Messages.module.css"

const Message = ({messages, name}) => {

    return (
        <div className={styles.messages}>
            <div>
                {messages.map(({message, user}, index) => {
                    const itsMe = user.trim().toLowerCase() === name.trim().toLowerCase();
                    const className = itsMe ? styles.me : styles.user;
                    const uniqueKey = `${index}-${Date.now()}`;
                    return (
                        <div key={uniqueKey} className={`${styles.messages} ${className}`}>
                            <div className={styles.user}>{user}</div>
                            <div className={styles.text}>{message}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}
export default Message;