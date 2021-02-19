import {
    eggIcon,
    fishIcon,
    garlicIcon,
    milkIcon,
    onionIcon,
    peanutsIcon,
    pepperIcon,
    shellfishIcon,
    soybeansIcon,
    wheatIcon,
} from 'Constant/Icons';

const list = [
    {title: 'milk', icon: milkIcon},
    {title: 'egg', icon: eggIcon},
    {title: 'fish', icon: fishIcon},
    {title: 'shellfish', icon: shellfishIcon},
    {title: 'peanuts', icon: peanutsIcon},
    {title: 'wheat', icon: wheatIcon},
    {title: 'soybeans', icon: soybeansIcon},
    {title: 'garlic', icon: garlicIcon},
    {title: 'onion', icon: onionIcon},
    {title: 'pepper', icon: pepperIcon},
]

export const iconFunction = (allergenList=[]) => {
    return list.map(org => {
       return allergenList.map(check => (org.title === check.title) && (check.on === true) && org.icon)
    })
} 

/**
 * input an object and update an array base on condition. 
 * this is created for cart
 * @param {object} initObj - object to update in the array 
 * @param {array} cardList - array list to be update by object
 */
export const handleFullUpdateAndAddToCart = (initObj, cardList) => {
    const objectsAreSame = (x, y) => {
        var objectsAreSame = true;
        for(var propertyName in x) {
           if(x[propertyName] !== y[propertyName]) {
              objectsAreSame = false;
              break;
           }
        }
        return objectsAreSame;
     }

    // check array length
    const arraysEqual = (a,b) => {
        if (a instanceof Array && b instanceof Array) {
            if (a.length!=b.length)  // assert same length
                return false;
            for(var i=0; i<a.length; i++)  // assert each element equal
                if (!objectsAreSame(a[i],b[i]))
                    return false;
            return true;
        }
    }

    let fullUpdateCardList;
    (cardList?.length > 0) && 
        cardList.forEach(item => {
            if (item?.itemNumber === initObj?.itemNumber) {
                if(item?.addOnSelected?.length < 1 && initObj?.addOnSelected?.length < 1){
                    return (fullUpdateCardList = (item.cartItemNumber))
                } else {
                    if(item?.addOnSelected?.length === initObj?.addOnSelected?.length) {
                        return (arraysEqual(initObj?.addOnSelected, item?.addOnSelected) === true) && 
                        (fullUpdateCardList = (item.cartItemNumber))
                    }
                }
            }
        })
    return (fullUpdateCardList)
        ?(
            cardList.map(item => 
                (item.cartItemNumber === fullUpdateCardList)
                    ? {
                        ...item,
                        orderAmount: parseInt(initObj?.orderAmount + item?.orderAmount)
                    }
                    : item
            )
        )
        :(
            [...cardList, initObj]
        )
};