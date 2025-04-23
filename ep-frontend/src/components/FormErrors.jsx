export const FormErrors = ({ errors }) => (
    <div className="bg-[#FDEAEA] text-[#EB5757] px-4 py-2 rounded mb-4 text-sm">
        {Object.values(errors).map((errMsg, index) => (
            <p key={index}>{errMsg}</p>
        ))}
    </div>
)