
export function hex(v: number, nd?: number) {
    if (!nd) nd = 2;
    return toradix(v, nd, 16);
}

export function toradix(v: number, nd: number, radix: number) {
    try {
        var s = v.toString(radix).toUpperCase();
        while (s.length < nd)
            s = "0" + s;
        return s;
    } catch (e) {
        return v + "";
    }
}

export function sqr(x: number) { return x * x; }

export function range(start: number, end: number): number[] {
    let result: number[] = new Array<number>(end - start);
    for (let i = start; i < end; i++) { result[i - start] = i; }
    return result;
}

export function stringToByteArray(s: string): Uint8Array {
    var a = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++)
        a[i] = s.charCodeAt(i);
    return a;
}

export type Only<T, U> = {
    [P in keyof T]: T[P];
  } & {
    [P in keyof U]?: never;
  };
  
export type Either<T, U> = Only<T, U> | Only<U, T>;

export type static_assert<T extends true> = never;
