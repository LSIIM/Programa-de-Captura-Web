import { NavLink, NavLinkProps } from "react-router-dom";

export interface TextLinkProps extends NavLinkProps {}

export default function TextLink(props: TextLinkProps) {
    return (
        <NavLink
            className={({ isActive }) =>
                `${props.className} my-link ${isActive ? "my-link-active" : ""}`
            }
            {...props}
        />
    );
}
