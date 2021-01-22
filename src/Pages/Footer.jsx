import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './styles.scss';
import { socialList, copyRight } from 'StaticDatas';

const Footer = () => {
    return(
        <div className="Footer">
            <div className="Footer-Inner-Wrap">
                <div>{copyRight}</div>
                <div className="Footer-Social-Block">
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