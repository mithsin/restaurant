export const AddMenuItemHandleChange = (event, state, setStateUpdate, ) => {
    const updateState = state.map((item)=> {
      if(item.title === event.target.name){
        return (
          {title: event.target.name, on: (event.target.checked ? true : false )})
      } else { 
        return item
      }
    })
    setStateUpdate(updateState);
};

export const ToggleCheckListOnChange = (event, stateTitle, stateOn, state, setStateUpdate, ) => {
    
    setStateUpdate({...state, on: !state});
};