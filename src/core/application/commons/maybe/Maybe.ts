type MaybeInterface<Type, U> = {
    type: Type;
};

export type Success<U> = MaybeInterface<"SUCCESS", U> & { result: U };
export type Error<U> = MaybeInterface<"ERROR", U> & { error: string };
export type Warning<U> = MaybeInterface<"WARNING", U> & { warning: string };
export type Suggest<U> = MaybeInterface<"SUGGEST", U> & { suggest: string };

export type Maybe<U> = Success<U> | Error<U> | Warning<U> | Suggest<U>;

export const success = <U>(result: U): Success<U> => ({
    type: "SUCCESS",
    result,
});

export const error = <U>(e: string): Error<U> => ({
    type: "ERROR",
    error: e,
});

export const warning = <U>(e: string): Warning<U> => ({
    type: "WARNING",
    warning: e,
});

export const suggest = <U>(e: string): Suggest<U> => ({
    type: "SUGGEST",
    suggest: e,
});


export const isSuccess = <U>(maybe: Maybe<U>): maybe is Success<U> => {
    return maybe.type === "SUCCESS";
};
export const isWarning = <U>(maybe: Maybe<U>): maybe is Warning<U> => {
    return maybe.type === "WARNING";
};
export const isError = <U>(maybe: Maybe<U>): maybe is Error<U> => {
    return maybe.type === "ERROR";
};
export const isSuggest = <U>(maybe: Maybe<U>): maybe is Suggest<U> => {
    return maybe.type === "SUGGEST";
};


export const getResult = <U>(maybe: Maybe<U>): U => {
    return (maybe as Success<U>).result;
};
export const getError = <U>(maybe: Maybe<U>): string => {
    return (maybe as Error<U>).error;
};
export const getWarning = <U>(maybe: Maybe<U>): string => {
    return (maybe as Warning<U>).warning;
};
export const getSuggest = <U>(maybe: Maybe<U>): string => {
    return (maybe as Suggest<U>).suggest;
};


export const acquireValidationColor = (maybe: Maybe<string> | undefined) => {
    if (maybe == undefined) return "primary";
    if (isError(maybe)) return "error"
    if (isWarning(maybe)) return "warning"
    if (isSuggest(maybe)) return "info"
};

export const acquireHelperText = (maybe: Maybe<string> | undefined) => {
    if (maybe == undefined) return "";
    if (isError(maybe)) return getError(maybe)
    if (isWarning(maybe)) return getWarning(maybe)
    if (isSuggest(maybe)) return getSuggest(maybe)
}

export const handleError = (maybe: Maybe<string> | undefined) => {
    if (maybe == undefined) return false
    if (isError(maybe) || isWarning(maybe) || isSuggest(maybe)) return true
}
