import React from 'react';
import Modal from '@material-ui/core/Modal';
import ItemEdit from 'Components/Forms/ItemEdit';
import './styles.scss';

const ItemCardList = ({ item, buttonLabel }) => {
    const { 
        imgSrc,
        itemNumber,
        title,
        price,
        itemDisable,
    } = item;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    return(
        <div className={`Item-Card-List-Wrapper ${itemDisable && 'disable'}`}>
            <div className="Item-Card-List-Img-block">
                <span>{itemNumber}</span>
                <img src={imgSrc} alt={title}/>
            </div>
            <div className="Item-Card-List-Text">
                    <h2>{title}</h2>
                <span className="Item-Card-List-span">
                    <h2>${price}</h2>
                    <button type="button" onClick={handleOpen}>{buttonLabel}</button>
                </span>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <ItemEdit 
                    itemDetails={item} 
                    handleOpen={handleOpen} 
                    handleClose={handleClose}/>
            </Modal>
        </div>
    );
};

export default ItemCardList;