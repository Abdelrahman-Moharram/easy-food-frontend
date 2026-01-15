import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react'

interface EditableFieldProps {
    value: string
    onSave: (value: string) => void
    className?: string
    inputClassName?: string
    placeholder?: string
    as?: 'input' | 'textarea'
    type?: string
    rows?: number
}

const EditableField = ({ 
    value: initialValue, 
    onSave, 
    className, 
    inputClassName,
    placeholder, 
    as = 'input',
    type = 'text',
    rows
}: EditableFieldProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(initialValue)
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

    // Sync with external updates
    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus()
        }
    }, [isEditing])

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent bubbling if needed
        setIsEditing(true)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = e.target.value
        setValue(val)
        onSave(val)
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && as !== 'textarea') {
            setIsEditing(false)
        }
    }

    if (isEditing) {
        if (as === 'textarea') {
            return (
                <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClassName}
                    placeholder={placeholder}
                    rows={rows}
                    onClick={(e) => e.stopPropagation()}
                />
            )
        }
        return (
            <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={inputClassName}
                placeholder={placeholder}
                onClick={(e) => e.stopPropagation()}
            />
        )
    }

    return (
        <span onClick={handleClick} className={className} role="button" tabIndex={0}>
            {value || <span className="opacity-50">{placeholder}</span>}
        </span>
    )
}

export default EditableField
