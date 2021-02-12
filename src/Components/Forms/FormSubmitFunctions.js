import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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

export const SizeHandleChange = (event, state, setStateUpdate, ) => {
  const updateState = state.map((item)=> {
    if(item.title === event.target.name){
      return (
        {...item, title: event.target.name, on: (event.target.checked ? true : false )})
    } else { 
      return item
    }
  })
  setStateUpdate(updateState);
};
export const SizeInputHandleChange = (event, list, title, state, setStateUpdate) => {
  const inputUpdates = {
    ...list,
    ...((title === "price") ? {[title]: parseInt(event.target.value)} : {[title]: event.target.value})
  }
    const updateState = state.map((item)=> {
      if(item.title === event.target.name){
        return (inputUpdates)
      } else { 
        return item
      }
    })
  setStateUpdate(updateState);
};

export const ToggleCheckListOnChange = (event, listTitle, stateTitle, stateOn, state, setStateUpdate, ) => {
    
    setStateUpdate({...state, [listTitle]: { title: stateTitle, on: !stateOn}});
};

export const toggleForLoopList = (toggleListObj, setToggles) => {
  const displayToggleList = [];
  for(const item in toggleListObj){
      displayToggleList.push(<FormControlLabel
          control={
          <Checkbox 
              checked={toggleListObj[item]?.on} 
              onChange={(event)=>
                  ToggleCheckListOnChange(
                      event,
                      `${item}`,
                      toggleListObj[item]?.title,
                      toggleListObj[item]?.on,
                      toggleListObj, 
                      setToggles )} 
              name={toggleListObj[item]?.title} />}
          label={toggleListObj[item]?.title}
      />)
  }
  return displayToggleList;
}
