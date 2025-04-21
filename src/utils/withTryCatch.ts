// export const withTryCatch = async <T>(fn: () => Promise<T>) => {
//     try {
//         const data = await fn();
//         return { data, error: null };
//     } catch (error) {
//         return `Error: ${(error as Error).message} || An unexpected error occurred`;
//     }
// };

export const withTryCatch = async <T>(fn: () => Promise<T>): Promise<{ data: T | null; error: string | null }> => {
    try {
      const data = await fn();
      return { data, error: null };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message || 'An unexpected error occurred',
      };
    }
  };
  