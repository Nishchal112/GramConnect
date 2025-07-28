import React from 'react'
import Initform from './initform'
import { useState } from 'react';
import styles from '@/styles/addinit.module.css'


function addinit() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleFormSubmit = (data) => {
        console.log('Form Data:', data);
        setIsFormOpen(false); // Close form after submission
    };
    return (
        <div>


            <button className={styles.addButton} onClick={() => setIsFormOpen(true)}>
                +
            </button>

            <Initform
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
            ></Initform>

        </div>
    )
}

export default addinit
