import React from 'react';
import Modal from '@material-ui/core/Modal';
import OrderBlock from 'Components/AdminComponents/OrderBlock';

const AdminOrders = ({notify, closeNotify, notice, setNotice, currentOrders, setCurrentOrders}) => {

    const handleCloseModal=()=>{
        setNotice('');
        closeNotify();
    }

    const sortByDate = (arrayDate) => {
        return arrayDate.sort((a,b)=> new Date(a.orderTime) - new Date(b.orderTime))
    }

    return(
        <section>
            <h2>Order List</h2>

            <div className="AdminOrders-OrderList-Wrapper">
                {
                    sortByDate(currentOrders)?.map((order, index) => 
                        <OrderBlock
                            currentOrders={currentOrders}
                            setCurrentOrders={setCurrentOrders}
                            order={order} 
                            index={index} 
                            key={index} />
                    )
                }
            </div>

            <Modal
                open={notify}
                onClose={closeNotify}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                    <div style={{height: '500px', maxWidth: '400px', width: '100%', backgroundColor: 'white', display:'felx', flexDirection: 'column', justifyContent: 'center', alignContent: 'center'}}>
                        <h3>New order: {"NEW ORDER RECEIVED"}</h3>
                        <button onClick={handleCloseModal}>Acknowledge New Order</button>
                    </div>
            </Modal>
        </section>
    )
};

export default AdminOrders;