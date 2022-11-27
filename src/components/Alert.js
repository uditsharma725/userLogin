import React from 'react'

export default function Alert(props) {

    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    let bg = 'red';
    if(props.alert) {
        if(props.alert.type === 'warning') bg = 'red';
        else bg = 'green';
    }


    return (
        <div>
            {props.alert && <div className={`mt-24 text-center bg-${bg}-500 
            py-5 mx-7 rounded-md text-white text-lg`}>
                <strong>{capitalize(props.alert.type)}</strong>! {props.alert.message}
            </div>}
        </div>
    )
}
