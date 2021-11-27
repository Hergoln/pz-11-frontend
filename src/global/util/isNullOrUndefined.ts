

export default function isNullOrUndefined(val: any) {
    return typeof val === "undefined" || val === null;
}