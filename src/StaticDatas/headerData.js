import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faImages } from '@fortawesome/free-solid-svg-icons';

export const headerMenuLinks = [{
    title: "Shout-out",
    icon: <FontAwesomeIcon icon={faBullhorn} style={{cursor: 'pointer'}} className="fa-2x"/>,
    link: "",
},{
    title: "Albums",
    icon: <FontAwesomeIcon icon={faImages} style={{cursor: 'pointer'}} className="fa-2x"/>,
    link: "/photo-gallery"
}]; 