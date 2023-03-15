import React, {useState} from 'react';
import Chat from "./Chat";
import styles from "../styles/Main.module.css"


const FIELDS = {
    NAME: 'name', ROOM: 'room',
}

const MainPage = () => {

    const {NAME, ROOM} = FIELDS
    const [values, setValues] = useState({[NAME]: '', [ROOM]: ''});
    const [isChatVisible, setVisible] = useState(false);


    const handleChange = ({target: {value, name}}) => {
        setValues({...values, [name]: value})
    }

    const clickHandler = () => {
        const isDisabled = Object.values(values).some(value => !value);
        // Если нет никакого значения в полях инпут, то никуда не переходить
        if (!isDisabled) {
            setVisible(!isChatVisible);
        }
        ;

    }

    if (isChatVisible) {
        return <Chat name={values[NAME]}/>
    }

    return (<div className={styles.wrap}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Join</h1>
                <form className={styles.form}>
                    <div className={styles.group}>
                        <input
                            onChange={handleChange}
                            className={styles.input}
                            type={"text"}
                            name='name'
                            value={values[NAME]}
                            placeholder={"Username"}
                            autoComplete={"off"}
                            required=''
                        />
                    </div>
                    <div className={styles.group}>
                        <input
                            onChange={handleChange}
                            className={styles.input}
                            type={"text"}
                            name='room'
                            value={values[ROOM]}
                            name='room'
                            placeholder="Room"
                            autoComplete="off"
                            required=""
                        />
                    </div>

                    <button className={"btn btn-lg btn-primary"} type={"submit"} onClick={clickHandler}>Enter</button>
                </form>
            </div>
        </div>

    );
};

export default MainPage;