import { ChangeEvent, useState } from "react";
import { FormType, SingleValidationRules, ValidationSchemaType } from "../../Types/Others";
import { DefaultInputValidate } from "../Common/useValidations";



const useForm = (initialValues: FormType = {}, globalValidationSchema: ValidationSchemaType = {}) => {
    const [form, setForm] = useState<FormType>(initialValues);
    const [formErrors, setFormErrors] = useState<FormType>({});

    const onChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        validationSchema?: SingleValidationRules
    ) => {
        const { name, type, value, files,checked} = event.target as HTMLInputElement;

        let newValue: any;

        if (type === "file") {
        newValue = files?.length === 1 ? files[0] : files;
        } else if (type === "checkbox") {
        newValue = checked; 
        } else {
        newValue = value;
        }


        setForm(prev => ({ ...prev, [name]: newValue }));

        const schema = validationSchema || globalValidationSchema[name];
        if (schema) {
            const error = DefaultInputValidate({ name, value: newValue, validationSchema: schema });
            setFormErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const getFormData = (): FormData => {
        const formData = new FormData();

        for (const key in form) {
            const value = form[key];

            if (value === null || value === "" || typeof value === "undefined") {
                // ✅ Skip or explicitly set empty string depending on your API
                continue; // means backend won't see this field at all
                // OR:
                // formData.append(key, ""); // if API expects it always present
            } else if (value instanceof FileList) {
                Array.from(value).forEach(file => formData.append(key, file));
            } else if (value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value);
            }
        }

        return formData;
    };


    const validateForm = (): boolean => {
        const errors: FormType = {};

        for (const key in globalValidationSchema) {
            const value = form[key];
            const schema = globalValidationSchema[key];

            const fieldErrors = DefaultInputValidate({ name: key, value, validationSchema: schema });
            if (fieldErrors.length > 0) {
                errors[key] = fieldErrors;
            }
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return {
        form,
        formErrors,
        setForm,
        setFormErrors,
        onChange,
        getFormData,
        validateForm
    };
};

export default useForm;
