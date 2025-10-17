// ✅ Patterns
export const phoneNumberPattern      = "^(05|\\+966|966)[0-9]{8}$";
export const commercialNumberPattern = "^[1-9][0-9]{9}$";
export const identityNumberPattern   = "^[1-9][0-9]{9}$";
export const hijriDatePattern        = "^([٠-٢]?[٠-٩])-([٠-١]?[٠-٩])-(١[٣-٤][٠-٩][٠-٩]|[١٢][٠-٩][٠-٩][٠-٩])$";
export const numberPattern           = "^[1-9][0-9]{2,}$";
export const amountPattern           = "^[0-9.]+$";

export const usernamePattern         = "^[a-zA-Z][a-zA-Z0-9_.-]{2,}$";
export const fullNamePattern         = "^([ء-ي][ء-ي ]{4,}|[a-zA-Z][a-zA-Z ]{4,})$";
export const arDepartmentNamePattern = "^[ء-ي][ء-ي ]{2,}$";
export const emailPattern            = "^[a-z][a-z0-9-_\\.]+@[a-z.]+\\.[a-z]{2,3}$";
export const departmentNamePattern   = "^[a-zA-Z][a-zA-Z0-9 ]{1,}$";

export const domainPattern           = "^(((?!-))(xn--|_)?[a-z0-9-]{0,61}[a-z0-9]{1,1}\\.)*(xn--)?([a-z0-9][a-z0-9\\-]{0,60}|[a-z0-9-]{1,30}\\.[a-z]{2,})$";
export const portNumberPattern       = "^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$";




export const phoneNumberRegex = {
  value: phoneNumberPattern,
  message: "Phone number must start with (05, +966, or 966) and contain 8 digits",
  message_ar: "رقم الهاتف يجب أن يبدأ بـ (05 أو +966 أو 966) ويحتوي على 8 أرقام"
};

export const commercialNumberRegex = {
  value: commercialNumberPattern,
  message: "Commercial registration number must be 10 digits and not start with 0",
  message_ar: "رقم السجل التجاري يجب أن يتكون من 10 أرقام ولا يبدأ بـ 0"
};

export const identityNumberRegex = {
  value: identityNumberPattern,
  message: "National ID must contain 10 digits and cannot start with 0",
  message_ar: "رقم الهوية يجب أن يتكون من 10 أرقام ولا يبدأ بـ 0"
};

export const hijriDateRegex = {
  value: hijriDatePattern,
  message: "Invalid Hijri date format (dd-mm-yyyy)",
  message_ar: "تاريخ هجري غير صالح (اليوم-الشهر-السنة)"
};

export const numberRegex = {
  value: numberPattern,
  message: "Number must contain at least 3 digits",
  message_ar: "الرقم يجب أن يتكون من 3 أرقام على الأقل"
};

export const amountRegex = {
  value: amountPattern,
  message: "Amount must be a valid number",
  message_ar: "المبلغ يجب أن يكون رقمًا صحيحًا"
};

export const usernameRegex = {
  value: usernamePattern,
  message: "Username must start with a letter, be at least 3 characters, and not include [+%$#/|\\!]",
  message_ar: "اسم المستخدم يجب أن يبدأ بأحرف ويحتوي على 3 أحرف على الأقل ولا يحتوي على [+%$#/|\\!]"
};

export const fullNameRegex = {
  value: fullNamePattern,
  message: "Full name must be at least 5 letters and contain no digits",
  message_ar: "الاسم الكامل يجب أن يتكون من 5 أحرف على الأقل ولا يحتوي على أرقام"
};

export const arDepartmentNameRegex = {
  value: arDepartmentNamePattern,
  message: "Department name (Arabic) must be at least 3 characters and contain no symbols",
  message_ar: "اسم القسم (عربي) يجب أن يتكون من 3 أحرف على الأقل بدون أي رموز"
};

export const emailRegex = {
  value: emailPattern,
  message: "Invalid email address",
  message_ar: "البريد الإلكتروني غير صحيح"
};

export const departmentNameRegex = {
  value: departmentNamePattern,
  message: "Department name must be at least 3 characters and contain no symbols",
  message_ar: "اسم القسم يجب أن يتكون من 3 أحرف على الأقل بدون أي رموز"
};

export const domainRegex = {
  value: domainPattern,
  message: "Invalid domain address",
  message_ar: "عنوان النطاق غير صالح"
};

export const portNumberRegex = {
  value: portNumberPattern,
  message: "Invalid port number",
  message_ar: "رقم المنفذ غير صحيح"
};
