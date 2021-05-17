import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FooterStyle } from './styles';
import {useTheme} from 'react-jss';
import { socialList, copyRight } from 'StaticDatas';

const Footer = () => {
    const theme = useTheme();
    const classes = FooterStyle({ theme });
    return(
        <div className={classes["Footer"]}>
            <div className={classes["Footer-Inner-Wrap"]}>
                <div>{copyRight}</div>
                <div className={classes["Footer-Social-Block"]}>
                    {socialList.map((soc, index)=>
                        soc.link &&
                            (<a key={`${index}-social`} href={soc.link}>
                                <FontAwesomeIcon icon={soc.icon} className="fa-2x"/>
                            </a>)
                    )}
                </div>
            </div>
        </div>
    );
};

export default Footer;