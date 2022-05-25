const getErrorField = (data) => {
    const fieldError = {
        message: '',
        field: '',
    };
    if (typeof data === 'object') {
        const keys = Object.keys(data);
        if (keys.length > 0) {
            fieldError.field = keys[0];
            const errMessages = data[keys[0]];
            if (errMessages.length > 0) {
                fieldError.message = errMessages[0];
            } else {
                fieldError.message = errMessages;
            }
        }
    }
    return fieldError;
};

const frameError = (errorResponse) => {
    const { data, statusText, status } = errorResponse;
    const { field, message } = getErrorField(data);
    return {
        // data,
        status,
        statusText,
        field,
        message,
    };
};

export {
    getErrorField,
    frameError
};
