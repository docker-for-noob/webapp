type MaybeInterface<Type, U> = {
    type: Type;
};

export type Success<U> = MaybeInterface<"SUCCESS", U> & { result: U };
export type Error<U> = MaybeInterface<"ERROR", U> & { error: string };
export type Maybe<U> = Success<U> | Error<U>;

export const success = <U>(result: U): Success<U> => ({
    type: "SUCCESS",
    result,
});

export const error = <U>(e: string): Error<U> => ({
    type: "ERROR",
    error: e,
});

export const isSuccess = <U>(maybe: Maybe<U>): maybe is Success<U> => {
    return maybe.type === "SUCCESS";
};

export const isError = <U>(maybe: Maybe<U>): maybe is Error<U> => {
    return maybe.type === "ERROR";
};

export const getResult = <U>(maybe: Maybe<U>): U => {
    return (maybe as Success<U>).result;
};

export const getError = <U>(maybe: Maybe<U>): string => {
    return (maybe as Error<U>).error;
};