import React from 'react';
import { useHistory } from 'react-router-dom';
import { headerMenuLinks, logoImg } from 'StaticDatas';
import { HeaderStyles } from './styles';

const Header = ({theme}) => {
    const history = useHistory();
    const classes = HeaderStyles({...theme.iconsType.header});

    return(
        <div className={classes.wrapper}>
            <span className={classes.Logo} ><img onClick={()=> history.push('/')} src={logoImg} alt="logo"/></span>

            <ul className={classes.MenuList}>
                {
                    headerMenuLinks.map((type, index)=> 
                        type?.link && <li key={`${index}-link`} className={classes.MenuLi}  onClick={()=> history.push(type.link)}>
                            {type.icon}
                            {type.title}
                        </li>)
                }
            </ul>
        </div>
    )
};

export default Header;