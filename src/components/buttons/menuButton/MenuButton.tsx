import { useRef, useState } from "react";
import IconButton, { IconButtonProps } from "../iconButton/IconButton";
import { Overlay } from "react-bootstrap";

export interface MenuButtonProps extends IconButtonProps {}

export default function MenuButton({ children, ...props }: MenuButtonProps) {
    //HOOKS
    const buttonRef = useRef<HTMLButtonElement>(null);

    //STATES
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <IconButton ref={buttonRef} {...props} onClick={() => setShowMenu(true)} />
            <Overlay
                show={showMenu}
                placement="bottom-end"
                flip
                target={buttonRef.current}
                rootClose
                onHide={() => setShowMenu(false)}
            >
                {({
                    placement: _placement,
                    arrowProps: _arrowProps,
                    show: _show,
                    popper: _popper,
                    hasDoneInitialMeasure: _hasDoneInitialMeasure,
                    ...props
                }) => <div className="shadow rounded" {...props}>{children}</div>}
            </Overlay>
        </>
    );
}
