import { NavLink, NavLinkProps } from "react-router-dom";
import "./styles.css";

export interface LinkButtonProps extends NavLinkProps {}

export default function LinkButton(props: LinkButtonProps) {
    return (
        <NavLink
            className={({ isActive }) =>
                `${isActive ? "my-link-button active" : "my-link-button"} rounded p-1 ${props.className}`
            }
            {...props}
        />
    );
}
