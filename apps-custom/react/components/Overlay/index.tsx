import React,{Dispatch, SetStateAction} from "react"
import {Portal} from "vtex.store-drawer"
import styles from "./styles.css"
interface OverlayProps { 
    children: React.ReactNode,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
/**
 * Usar stop propagation nos filhos diretos do overlay
 */
const Overlay = ({children, setIsOpen}: OverlayProps) => {
    
    return (
        <Portal>
            <div onClick={()=> setIsOpen(false)} 
            className={styles.overlay}>
                {children}
            </div>
        </Portal>
    )
}
export default Overlay