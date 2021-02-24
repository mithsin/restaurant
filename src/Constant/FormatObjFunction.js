export const formatUpdateObjByKeyInArray = (initObj, arrayList, key) => {
    // console.log('-----------------------trigger-formatUpdateObjByKeyInArray------------------------->')
    return arrayList.map(item => 
        (item?.[`${key}`] !== initObj?.[`${key}`])
            ? item 
            : {...item, initObj}
    )
}