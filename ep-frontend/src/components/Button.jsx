import { Tooltip } from "react-tooltip"

export const Button = ({ onClick, children, className,type, style, disabled, id, tooltip }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${className} cursor-pointer`}
            style={style}
            disabled={disabled}
            data-tooltip-content={tooltip}
            data-tooltip-id={id}
        >
            <Tooltip id={id} />
            {children}
        </button>
    )
}