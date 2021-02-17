export const formatArrayObjToMuiCheckboxFormat = (initArray) => (
    initArray.map( obj => {
        return {
            ...obj,
            title: obj.name,
            on: false
        }
    })
);