import React, { useEffect, useState } from 'react';
import { Alert, Badge } from 'react-bootstrap';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { buyGem } from '../../services/api/lessonApi';
import { Toast, ToastContainer } from 'react-bootstrap';
import { isTokenValid } from '../../services/authority/tokenCheck';
import QRCode from 'qrcode.react';

function PaypalCheckoutButton(props) {
    const bundle = props.bundle;
    const [jsonBundle, setJsonbundle] = useState()
    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState();
    const [alertMsg, setAlertMsg] = useState();
    const [showToast, setShowToast] = useState(false);
    const [showQr, setShowQr] = useState(false);
    useEffect(() => {
        localStorage.setItem('purchaseBundle', JSON.stringify(bundle));
        const str = localStorage.getItem('purchaseBundle');
        setJsonbundle(str);
    }, [bundle]);
    return (
        <>
            <div className='popup-price' >
                <Badge className='m-2' bg='warning' text='light' >
                    BUY for ${bundle.price}
                </Badge>
                <Badge className='m-2' bg='info' text='light' onClick={()=>{setShowQr(!showQr);}}>
                    Show QR code
                </Badge>
            </div>
                <QRCode value={jsonBundle}  className={showQr?'':'qr-hidden'} />
            {showAlert ?
                <Alert variant={variant} dismissible>{alertMsg}</Alert>
                : <></>
            }
            <div>
                {/* <button className='payment-method'>Paypal Payment</button> */}
                <PayPalButtons
                    style={{
                        layout: 'vertical',
                        color: 'blue',
                        shape: 'pill',
                        label: 'paypal'
                    }}
                    onClick={async (data, actions) => {
                        const tokenValid = isTokenValid();
                        if (localStorage.getItem('currentUser') == null || !tokenValid) {
                            setShowToast(true);
                            return actions.reject();
                        }
                        const HasAlreadyBoughtCourse = false;
                        if (HasAlreadyBoughtCourse) {
                            setShowAlert(true);
                            setVariant('danger');
                            setAlertMsg('Has Already Bought Course');
                            return actions.reject();
                        } else {
                            return actions.resolve();
                        }
                    }}
                    createOrder={(data, action) => {
                        const purchaseBundle = JSON.parse(localStorage.getItem('purchaseBundle'));
                        return action.order.create({
                            purchase_units: [
                                {
                                    description: purchaseBundle.description,
                                    amount: {
                                        value: purchaseBundle.price
                                    },
                                    gem: purchaseBundle.gem
                                }
                            ]
                        });
                    }}
                    onApprove={async (data, actions) => {
                        //khi payment complete
                        const order = await actions.order.capture();
                        console.log(order)
                        const purchaseBundle = JSON.parse(localStorage.getItem('purchaseBundle'));
                        try {
                            const response = await buyGem(purchaseBundle.gem);
                            var gameData = JSON.parse(localStorage.getItem('userGameData'));
                            gameData.gem = gameData.gem + purchaseBundle.gem;
                            localStorage.setItem('userGameData', JSON.stringify(gameData));
                            setShowAlert(true);
                            setVariant('success');
                            setAlertMsg(`-Payment has been Successful. ${response}`);
                        } catch (error) {
                            actions.restart();
                            console.log(error)
                        }
                    }}
                    onCancel={() => {
                        setShowAlert(true);
                        setVariant('warning');
                        setAlertMsg('Paypal checkout CANCEL');
                    }}
                    onError={(err) => {
                        setShowAlert(true);
                        setVariant('danger');
                        setAlertMsg('Paypal checkout ERROR: ', err);
                    }}
                >
                </PayPalButtons>
                <ToastContainer position="middle-center">
                    <Toast show={showToast} onClose={() => setShowToast(false)} bg="warning">
                        <Toast.Header>
                            <strong className="me-auto">Login Require</strong>
                        </Toast.Header>
                        <Toast.Body>Please, login first to buy gem.</Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        </>
    );
}

export default PaypalCheckoutButton;