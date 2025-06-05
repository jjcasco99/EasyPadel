export const Button = ({ onClick, children, className,type, style, disabled }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${className} cursor-pointer`}
            style={style}
            disabled={disabled}
        >
            {children}
        </button>
    )
}