const buildMessage = (label, error) => {
    if (error) {
        return `${label}: ${error.message}; ${error.stack}`.substring(0, 512);
    }
    return label;
};

export const reportNonFatal = (label, error) => {
    if (__DEV__) {
        console.warn(buildMessage(label, error));
    } else {
        // No-op: no error reporting in this branch
    }
};
