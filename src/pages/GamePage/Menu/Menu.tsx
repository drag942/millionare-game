import React from 'react';
import classnames from "classnames";
import styles from "./Menu.module.css";


interface MenuProps {
    menu: string[],
    selectedQuestion: string,
}

const Menu:React.FC<MenuProps> = ({menu, selectedQuestion}):React.ReactElement => {
    return (
        <div>

            {menu.slice(0).reverse().map((item: string) => {
                return <div key={item}>
                    <p
                        className={classnames(styles.item ,{
                            [styles.selectedItem]: item === selectedQuestion,
                            [styles.disabledItem]: menu.indexOf(item) < menu.indexOf(selectedQuestion)
                        })}
                    >{`$${item}`}<span className={styles.line}/></p>
                </div>
            })}
        </div>
    );
};

export default Menu;