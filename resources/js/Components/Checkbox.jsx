export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-purple-600 shadow-sm focus:ring-purple-500 ' +
                className
            }
        />
    );
}
