import React from 'react';
import { useTheme } from "react-jss";
import localization from 'localization';
import { CardItemStyle } from './styles';

const CardItem = (props) => {
    const {cardStatus, index, setSelected} = props;
    const theme = useTheme();
    const classes = CardItemStyle({ theme });
        
    return(
        <ul className={classes.CardItem} onClick={()=> setSelected(index)}>
            <li className={classes.CardTitleLi}>
                {cardStatus.title}
            </li>
            <li 
                className={classes.CardImgWrapper}
                style={{
                    backgroundImage: `url(${cardStatus.imgSrc})`,
                    height: "150px",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: "2rem"
                }}>
            </li>
            <li className={classes.CardTitleShowMenu}>
                {localization.cardItem.showMenu}
            </li>
        </ul>
    );
};

export default CardItem;