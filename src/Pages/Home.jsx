import React, { useState } from 'react';
import { homeStyles } from './styles';
import ImgPreNextCarousel from 'Components/ImageBlock/ImgPreNextCarousel';
import { useHistory } from 'react-router-dom';
import CardItem from 'Components/Card/CardItem';
import MenuBox from 'Components/MenuBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
    let history = useHistory();
    const classes = homeStyles();
    const [selected, setSelected] = useState(0)
    const imageList = [
        'http://www.myichot.com/wp-content/uploads/2016/09/IMG_9180-e1479504951999.jpg',
        'http://www.myichot.com/wp-content/uploads/2016/09/AdobeStock_109651968-e1479504909100.jpeg',
        'http://www.myichot.com/wp-content/uploads/2016/09/AdobeStock_76806527-e1479504847717.jpeg',
        'http://www.myichot.com/wp-content/uploads/2016/09/AdobeStock_52865717-e1479504712602.jpeg',
        'http://www.myichot.com/wp-content/uploads/2016/08/mmexport1471869935631.jpg'
    ];
    const iceCreamRollImgDefault = "http://www.myichot.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/IMG_9180-e1479504951999.jpg";
    const acaiBowlImgDefault = "http://www.myichot.com/wp-content/uploads/2016/09/AdobeStock_52865717-e1479504712602.jpeg";
    const bunImgDefault = "http://www.myichot.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/IMG_9384-e1479505121361.jpg";
    const WaffleImgDefault = "http://www.myichot.com/wp-content/uploads/photo-gallery/20180201_210917.jpg";
    const categoryList = [{
            title: "Ice Cream Roll",
            descriptions: "Rolled ice cream gives you the freedom to choose the flavors you want with fresh, quality ingredients. Ice cream artists roll the ice cream and serve it fresh-to-order daily.",
            imgSrc: "http://www.myichot.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/IMG_9180-e1479504951999.jpg",
            menuList: [{
                imgSrc: iceCreamRollImgDefault,
                itemNumber: 'A1',
                title: 'item name',
                description: 'item description',
                price: 10.99
            },{
                imgSrc: iceCreamRollImgDefault,
                itemNumber: 'A2',
                title: 'item name',
                description: 'item description',
                price: 11.99
            },{
                imgSrc: iceCreamRollImgDefault,
                itemNumber: 'A3',
                title: 'item name',
                description: 'item description',
                price: 12.99
            }]
        },{
            title: "Acai Bowl",
            descriptions: "Acai berries are known for their array of health benefits and richness in antioxidants. Acai bowls are thick smoothies topped with delicious fresh fruits and sweet honey.",
            imgSrc: "http://www.myichot.com/wp-content/uploads/2016/09/AdobeStock_52865717-e1479504712602.jpeg",
            menuList: [{
                imgSrc: acaiBowlImgDefault,
                itemNumber: 'B1',
                title: 'item name',
                description: 'item description',
                price: 10.99
            },{
                imgSrc: acaiBowlImgDefault,
                itemNumber: 'B2',
                title: 'item name',
                description: 'item description',
                price: 11.99
            },{
                imgSrc: acaiBowlImgDefault,
                itemNumber: 'B3',
                title: 'item name',
                description: 'item description',
                price: 12.99
            }]
        },{
            title: "Steamed buns",
            descriptions: "Steamed buns are made with flour and uniquely filled with different sweet or savory flavors. These steamed buns are sure to “wow” you from the first bite!",
            imgSrc: "http://www.myichot.com/wp-content/uploads/photo-gallery/imported_from_media_libray/thumb/IMG_9384-e1479505121361.jpg",
            menuList: [{
                imgSrc: bunImgDefault,
                itemNumber: 'C1',
                title: 'item name',
                description: 'item description',
                price: 10.99
            },{
                imgSrc: bunImgDefault,
                itemNumber: 'C2',
                title: 'item name',
                description: 'item description',
                price: 11.99
            },{
                imgSrc: bunImgDefault,
                itemNumber: 'C3',
                title: 'item name',
                description: 'item description',
                price: 12.99
            }]
        },{
            title: "Egg Waffle",
            descriptions: "Egg waffles are said to have a unique honeycomb shape that adds a whole new experience. You can enjoy them with your ice cream, or with a topping and sauce of your choice!",
            imgSrc: "http://www.myichot.com/wp-content/uploads/photo-gallery/20180201_210917.jpg",
            menuList: [{
                imgSrc: WaffleImgDefault,
                itemNumber: 'D1',
                title: 'item name',
                description: 'item description',
                price: 10.99
            },{
                imgSrc: WaffleImgDefault,
                itemNumber: 'D2',
                title: 'item name',
                description: 'item description',
                price: 11.99
            },{
                imgSrc: WaffleImgDefault,
                itemNumber: 'D3',
                title: 'item name',
                description: 'item description',
                price: 12.99
            }]
    }]

    return(
        <div className={classes.wrapper}>
            {/* <a className={classes.HomeOrderOnline} href="https://www.clover.com/online-ordering/ic-hot-kennesaw">ORDER ONLINE</a> */}
            <span className={classes.HomeOrderOnlineSpan} onClick={()=> history.push('/cart')}>
                <FontAwesomeIcon icon={faShoppingCart} className="fa-2x"/>
            </span>
            <div className={classes.ImgBlock}>
                <ImgPreNextCarousel 
                    imgSrc={imageList} 
                    selectedIndex={0}
                    arrowEnabled={true}/>
            </div>
            <div className={classes.CategoryWrapper}>
                <h1>MENU</h1>
                <div className={classes.CategoryList}>
                    {categoryList.map((category, index)=> (
                        <CardItem 
                            cardStatus={category} 
                            key={`${index}-category`}
                            index={index}
                            setSelected={setSelected}/>
                    ))}
                </div>
                <div className={classes.MenuOutterWrap}>
                    <MenuBox {...categoryList[selected]} />
                </div>
            </div>
        </div>
    )
}

export default Home; 