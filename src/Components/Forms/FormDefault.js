export const initItemState = {
    imgSrc: '',
    itemNumber: '',
    title: '',
    description: '',
    price: '',
};

export const allergenListDefault = [
    {title: "milk", on: false},
    {title: "egg", on: false},
    {title: "fish", on: false},
    {title: "shellfish", on: false},
    {title: "peanuts", on: false},
    {title: "wheat", on: false},
    {title: "soybeans", on: false},
    {title: "garlic", on: false},
    {title: "onion", on: false},
];

export const sizeListDefault = [{
    s: {
        price: 0,
        detail: "Small details"
      }
  },{
    m: {
        price: 0,
        detail: "Medium details"
    }
  },{
    l: {
        price: 0,
        detail: "Large details"
    }
}];

export const addOnsDefault = [{
    name: "add on item name",
    price: 0,
    details: "details of this add on",
    img: "addon.jpg"
}];

export const spicyDefault = {
    isSpicy: false,
    level: 3,
    optional: true
};

export const ItemToggles = {
    allergenToggle: {
        title: "Allergen List",
        on: false
    },
    sizeListToggle: {
        title: "Size List",
        on: false
    },
    addOnsToggle: {
        title: "Add-On List",
        on: false
    },
    spicyDefaultToggle: {
        title: "Spicy?",
        on: false
    }
}