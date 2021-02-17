import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { MuiInputField } from 'Components/MUI';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
  listRoot: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeIndividualWrap: {
    display: 'flex',
    marginBottom: '.5rem',
    alignItems: 'center',
  },
  formControlLabel: {
    paddingRight: '1rem',
    '&:hover': {
      backgroundColor: 'pink'
    },
  }
}));

const MuiCheckboxListWithCheckedInput = ({checkBoxState, setCheckBoxStateUpdate, handleChange, inputHandleChange, listTitle, helpText}) => {
  const classes = useStyles();
  const handleChangeFunction = (event) => handleChange(event, checkBoxState, setCheckBoxStateUpdate);
  const FormControllerLabelTemplate = ({title, on}) => (
    <FormControlLabel
        className={classes.formControlLabel} 
        control={
          <Checkbox 
            checked={on} 
            onChange={handleChangeFunction} 
            name={title} />}
        label={`${title} - ${on ? 'on' : 'off'}`}
    />
  );

const inputListBlockRender = (item) => {
    const inputBlock = [];
    for ( const info in item ){
      if(info !== "title" && info !== "on"){
        inputBlock.push(
          <MuiInputField
            bgColor="#fff"
            name={item.title}
            label={info}
            defaultValue={item?.[info]}
            onChange={ (event)=> inputHandleChange(event, item, info, checkBoxState, setCheckBoxStateUpdate) }/>
        )
      }
    }
    return inputBlock;
    
}

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        {listTitle && <FormLabel component="legend">{listTitle}</FormLabel>}
        <FormGroup className={classes.listRoot}>
          {
            checkBoxState.map((item, index)=>
              <div className={classes.sizeIndividualWrap}>
                <FormControllerLabelTemplate key={`check-list-${index}`} {...item}/>
                { item?.on === true && inputListBlockRender(item) }
              </div>
            )
          }
        </FormGroup>
        {helpText && <FormHelperText>{helpText}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default MuiCheckboxListWithCheckedInput;