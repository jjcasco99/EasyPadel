

export const Button = ({ onClick, text, className,type}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${className} cursor-pointer`}
        >
            {text}
        </button>
    )
}