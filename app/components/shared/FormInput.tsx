
interface FormInputProps {
    label: string
    id: string
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    required?: boolean
    autoComplete?: string
}

export function FormInput({
    label,
    id,
    type,
    value,
    onChange,
    required = false,
    autoComplete,
}: FormInputProps) {
return (
    <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
    </label>
    <div className="mt-1">
        <input
            name={id}
            id={id}
            type={type}
            autoComplete={autoComplete}
            required={required}
            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 bg-gray-800 text-white sm:text-sm"
            value={value}
            onChange={onChange}
        />
        </div>
    </div>
    )
}
