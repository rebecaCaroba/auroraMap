interface Return {
    error: boolean
    message: string
}

export function IsPasswordCorrect(password: string, confirmPassword: string): Return {
    if (password.length < 7) {
        return { message: 'A senha deve ser maior que 6 caracteres', error: true };
    }

    if (password.length > 31) {
        return { message: 'A senha deve ser menor que 32 caracteres', error: true };
    }

    if (password !== confirmPassword) {
        return { message: 'As senhas não coincidem', error: true }
    }

    return { message: 'A senha está correta', error: false };


}