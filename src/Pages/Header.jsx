import React from 'react';
import { useHistory } from 'react-router-dom';
import { headerMenuLinks } from 'StaticDatas';
import { HeaderStyles } from './styles';
import { logoImg } from 'StaticDatas'

const Header = () => {
    const history = useHistory();
    const classes = HeaderStyles();

    return(
        <div className={classes.wrapper}>
            <span className={classes.Logo} ><img onClick={()=> history.push('/')} src={logoImg} alt="logo"/></span>

            <ul className={classes.MenuList}>
                {
                    headerMenuLinks.map((type, index)=> 
                        <li key={`${index}-link`} className={classes.MenuLi}  onClick={()=> history.push(type.link)}>
                            {type.title}
                        </li>)
                }
            </ul>
        </div>
    )
};

export default Header;