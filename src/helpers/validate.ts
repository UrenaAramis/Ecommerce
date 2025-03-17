import { ILoginProps, ILoginPropsErrors, IRegisterProps, IRegisterPropsErrors } from "@/types";

function validateEmail(email: string): string | undefined {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email address is invalid";
}

function validatePassword(password: string): string | undefined {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters long";
}

function validateFullName(name: string): string | undefined {
    if (!name) return "Full name is required";
    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,}(\s[A-Za-zÁÉÍÓÚáéíóúÑñ]{2,})+$/.test(name)) {
        return "Please enter a valid full name (first and last name, only letters)";
    }
}

export function validateLoginForm(values: ILoginProps) {
    const errors: ILoginPropsErrors = {};

    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(values.password);
    if (passwordError) errors.password = passwordError;

    return errors;
}

export function validateRegisterForm(values: IRegisterProps) {
    const errors: IRegisterPropsErrors = {};

    const nameError = validateFullName(values.name);
    if (nameError) errors.name = nameError;

    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;

    if (!values.address) {
        errors.address = "Address is required";
    }

    if (!values.phone) {
        errors.phone = "Phone is required";
    } else if (!/^\+?[0-9]{10,15}$/.test(values.phone)) {
        errors.phone = "Phone number must be valid (10-15 digits)";
    }

    const passwordError = validatePassword(values.password);
    if (passwordError) errors.password = passwordError;

    return errors;
}
