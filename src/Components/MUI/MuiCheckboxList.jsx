import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import { CostExplorer } from 'aws-sdk';

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
  formControlLabel: {
    paddingRight: '1rem',
    '&:hover': {
      backgroundColor: 'pink'
    },
  }
}));

const MuiCheckboxList = ({updateListState, setUpdateListState, listTitle, helpText}) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const updateState = updateListState.map((item)=> {
      if(item.title === event.target.name){return ({title: event.target.name, on: (event.target.checked ? true : false )})}
      else {return item}
    })
    
    setUpdateListState({...updateListState, list: [updateState]});
  };
  console.log("updateListState--->: ", updateListState)
  const FormControllerLabelTemplate = ({title, on}) => (
    <FormControlLabel
        className={classes.formControlLabel} control={<Checkbox checked={on} onChange={handleChange} name={title} />}
        label={title}
    />
  );

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        {listTitle && <FormLabel component="legend">{listTitle}</FormLabel>}
        <FormGroup className={classes.listRoot}>
          {
            updateListState.map((item, index)=>
              <FormControllerLabelTemplate key={`check-list-${index}`} {...item}/>)
          }
        </FormGroup>
        {helpText && <FormHelperText>{helpText}</FormHelperText>}
      </FormControl>
    </div>
  );
}

export default MuiCheckboxList;