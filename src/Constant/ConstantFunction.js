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