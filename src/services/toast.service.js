import React from 'react';
import { toast , Slide, Zoom, Flip, Bounce } from 'react-toastify';

// Uses React Toastify: https://github.com/fkhadra/react-toastify

class Toast{
    static success(message){
        toast.success(`👍 ${message}`);  
    }

    static error(message){
        toast.error(`🔥 ${message}`);
    }

    static warning(message){
        toast.warning(`❗ ${message}`);
    }

    static info(message){
        toast.info(`ℹ  ${message}`);
    }

    static configure(){
        toast.configure({
            position:toast.POSITION.TOP_RIGHT,
            autoClose:5000,
            transition:Bounce,
            draggable: true,
        });
    }
}

export default Toast;