import React, { useEffect, useContext, useRef } from 'react';
import ToastsContext from '../../ToastsContext';
import { Toast } from '@ui5/webcomponents-react';

//import './Toasts.css'

export default function Toasts() {
    const { toastsMessage, setToastsMessage } = useContext(ToastsContext);
    const style = {
        position: 'absolute',
        width: '334px',
        height: '48px',
        right: '25%',
        left: '50%',
        bottom: '32px',
        marginLeft: '-150px',
        zIndex: '1'
    }
    const toastref = useRef();
    useEffect(() => {
        if(toastsMessage.length > 0 ){
            toastref.current.show();
            setTimeout(() => {
                setToastsMessage('')
            }, 3000)
        }
    }, [toastsMessage, setToastsMessage])

    return <Toast ref={toastref} style={style}>{toastsMessage}</Toast>
}
