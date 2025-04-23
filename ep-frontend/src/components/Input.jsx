
export const Input = ({type, value, onChange, placeholder, className, name}) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
        />
    )
}