export const withTryCatch = async <T>(fn: () => Promise<T>) => {
    try {
        const data = await fn();
        return { data, error: null };
    } catch (error) {
        return `Error: ${(error as Error).message} || An unexpected error occurred`;
    }
};
