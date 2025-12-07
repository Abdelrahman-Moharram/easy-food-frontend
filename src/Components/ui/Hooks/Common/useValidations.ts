import { SingleValidationRules } from "../../Types/Others";
import i18n from "i18next";

interface DefaultInputProps {
  name: string;
  value: string | number | boolean | File | FileList | File[];
  validationSchema: SingleValidationRules;
  alter_name?: string;
}

const defaultNumberValueError = (name: string, alter_name?: string) =>
  `برجاء إدخال قيمة رقمية فقط في ${alter_name || name}`;
const defaultMaxValueError = (name: string, maxValue: number, alter_name?: string) =>
  `قيمة ${alter_name || name} لايجب أن تكون أكبر من ${maxValue}`;
const defaultMinValueError = (name: string, MinValue: number, alter_name?: string) =>
  `قيمة ${alter_name || name} لايجب أن تكون أقل من ${MinValue}`;
const defaultMaxLengthError = (name: string, maxLength: number, alter_name?: string) =>
  `لا يجب أن يكون ${alter_name || name} أقل من ${maxLength} أحرف`;
const defaultMinLengthError = (name: string, minLength: number, alter_name?: string) =>
  `لا يجب أن يكون ${alter_name || name} أكبر من ${minLength} أحرف`;

const defaultExtensionError = (exts: string[], alter_name?: string) =>
  `صيغة الملف المسموح بها هي: ${exts.join(", ")} ${alter_name ? `للحقل ${alter_name}` : ""}`;

const defaultFileSizeError = (size: number, alter_name?: string) =>
  `أقصى حجم مسموح به ${size} ميجابايت ${alter_name ? `للحقل ${alter_name}` : ""}`;

export const DefaultInputValidate = ({ name, value, validationSchema }: DefaultInputProps) => {
  // ✅ File validation
  if (value instanceof File) {
    const file = value;
    const rules = validationSchema.file;

    if (rules?.allowedExtensions?.length) {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!rules.allowedExtensions.includes(ext)) {
        return [rules.message || defaultExtensionError(rules.allowedExtensions, validationSchema.alter_name)];
      }
    }

    if (rules?.maxSizeInMB && file.size / (1024 * 1024) > rules.maxSizeInMB) {
      return [rules.message || defaultFileSizeError(rules.maxSizeInMB, validationSchema.alter_name)];
    }
  }

  // ✅ Number value validation
  if (validationSchema.minValue || validationSchema.maxValue) {
    if (Number.isNaN(Number(value)))
      return [validationSchema?.maxValue?.message || defaultNumberValueError(name, validationSchema.alter_name)];

    const numericValue = Number(value);
    if (validationSchema.maxValue && numericValue > validationSchema.maxValue.value) {
      return [
        validationSchema.maxValue.message ||
          defaultMaxValueError(name, validationSchema.maxValue.value, validationSchema.alter_name),
      ];
    }
    if (validationSchema.minValue && numericValue < validationSchema.minValue.value) {
      return [
        validationSchema.minValue.message ||
          defaultMinValueError(name, validationSchema.minValue.value, validationSchema.alter_name),
      ];
    }
  }

  // ✅ Length validation
  const strVal = value?.toString?.() ?? "";
  if (validationSchema.maxLength && strVal.length > validationSchema.maxLength.value) {
    return [
      validationSchema.maxLength.message ||
        defaultMaxLengthError(name, validationSchema.maxLength.value, validationSchema.alter_name),
    ];
  }

  if (validationSchema.minLength && strVal.length < validationSchema.minLength.value) {
    return [
      validationSchema.minLength.message ||
        defaultMinLengthError(name, validationSchema.minLength.value, validationSchema.alter_name),
    ];
  }

  // ✅ Regex validation
  if (validationSchema.regex?.value) {
    const re = new RegExp(validationSchema.regex.value);
    if (!re.test(strVal)) {
      console.log(validationSchema?.regex);
      
      return [i18n.language.startsWith("ar") ? validationSchema?.regex?.message_ar : validationSchema?.regex?.message  || `برجاء إدخال قيمة ${name} صحيحة`];
    }
  }

  return undefined;
};
