import React from 'react';
import { CardItemStyle } from './styles';

const CardItem = ({cardStatus, index, setSelected}) => {
    const classes = CardItemStyle();
        
    return(
        <ul className={classes.CardItem} onClick={()=> setSelected(index)}>
            <li className={classes.CardTitleLi}>
                {cardStatus.title}
            </li>
            <li className={classes.CardImgWrapper}>
                <img
                    className={classes.img} 
                    src={cardStatus.imgSrc}
                    alt='card' />
            </li>
            <li className={classes.CardTitleShowMenu}>
                SHOW MENU
            </li>
        </ul>
    );
};

export default CardItem;