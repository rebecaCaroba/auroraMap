interface Return {
    error: boolean
    messege: string
}


export function isDangerTypeCorret(danger: string): Return {
    if(danger.length > 30 ) {
        return {error: true, messege}
    }

    return 
}