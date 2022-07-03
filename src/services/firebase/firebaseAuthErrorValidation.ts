export function firebaseAuthError(errorCode: string, next: (customErrorMessage: string) => void) {
    let customErrorMessage: string = "Error";
    
    if (/auth\/invalid-email/.exec(errorCode)) {
        customErrorMessage = "Email address is not valid";
    } else if (/auth\/user-disabled/.exec(errorCode)) {
        customErrorMessage = "User with this email has been disabled";
    } else if (/auth\/user-not-found/.exec(errorCode)) {
        customErrorMessage = "There is no user corresponding to the given email";
    } else if (/auth\/wrong-password/.exec(errorCode)) {
        customErrorMessage = "User with this email has been disabled";
    } else if (/auth\/too-many-requests/.exec(errorCode)) {
        customErrorMessage = "Access to this account has been temporarily disabled due to many failed login attempts. \
        You can immediately restore it by resetting your password or you can try again later.";
    }

    next(customErrorMessage);
}

export function firebaseCreateUserError(errorCode: string, next: (customErrorMessage: string) => void) {
    let customErrorMessage: string = "Error";
    
    if (/auth\/email-already-in-use/.exec(errorCode)) {
        customErrorMessage = "Account with the given email address already exists";
    } else if (/auth\/invalid-email/.exec(errorCode)) {
        customErrorMessage = "Email address is not valid";
    } else if (/auth\/operation-not-allowed/.exec(errorCode)) {
        customErrorMessage = "Email/password accounts are not enabled";
    } else if (/auth\/weak-password/.exec(errorCode)) {
        customErrorMessage = "Password is not strong enough";
    } else if (errorCode === "User whith this login already exist") {
        customErrorMessage = "User whith this login already exist";
    }

    next(customErrorMessage);
}