export default function Modal({children,onBackdropClick}){
    return (
        <div onClick={onBackdropClick} className="backdrop">
        <div onClick={(e)=>{e.stopPropagation()}} className="modal">
            {children}
        </div>
        </div>
    )
}