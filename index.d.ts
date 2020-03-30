/*! noble-ed25519 - MIT License (c) Paul Miller (paulmillr.com) */
export declare const CURVE_PARAMS: {
    a: bigint;
    d: bigint;
    P: bigint;
    n: bigint;
    h: bigint;
    Gx: bigint;
    Gy: bigint;
};
declare type PrivKey = Uint8Array | string | bigint | number;
declare type PubKey = Uint8Array | string | Point;
declare type Hex = Uint8Array | string;
declare type Signature = Uint8Array | string | SignResult;
declare class ExtendedPoint {
    x: bigint;
    y: bigint;
    z: bigint;
    t: bigint;
    static ZERO_POINT: ExtendedPoint;
    static fromPoint(p: Point): ExtendedPoint;
    constructor(x: bigint, y: bigint, z: bigint, t: bigint);
    static batchAffine(points: ExtendedPoint[]): Point[];
    equals(other: ExtendedPoint): boolean;
    negate(): ExtendedPoint;
    double(): ExtendedPoint;
    add(other: ExtendedPoint): ExtendedPoint;
    multiplyUnsafe(scalar: bigint): ExtendedPoint;
    toAffine(invZ?: bigint): Point;
}
declare type yAndLByte = [bigint, boolean];
export declare class Point {
    x: bigint;
    y: bigint;
    static BASE_POINT: Point;
    static ZERO_POINT: Point;
    private WINDOW_SIZE?;
    private PRECOMPUTES?;
    constructor(x: bigint, y: bigint);
    _setWindowSize(windowSize: number): void;
    static getYFromHex(hash: Hex): yAndLByte;
    static fromY(ybt: yAndLByte, invdyy1: bigint): Point;
    static fromHex(hash: Hex): Point;
    encode(): Uint8Array;
    toHex(): string;
    toX25519(): bigint;
    equals(other: Point): boolean;
    negate(): Point;
    add(other: Point): Point;
    subtract(other: Point): Point;
    private precomputeWindow;
    multiply(scalar: bigint, isAffine: false): ExtendedPoint;
    multiply(scalar: bigint, isAffine?: true): Point;
}
export declare class SignResult {
    r: Point;
    s: bigint;
    constructor(r: Point, s: bigint);
    static fromHex(hex: Hex): SignResult;
    toHex(): string;
}
export declare function getPublicKey(privateKey: Uint8Array): Promise<Uint8Array>;
export declare function getPublicKey(privateKey: string): Promise<string>;
export declare function getPublicKey(privateKey: bigint | number): Promise<Uint8Array>;
export declare function sign(hash: Uint8Array, privateKey: PrivKey): Promise<Uint8Array>;
export declare function sign(hash: string, privateKey: PrivKey): Promise<string>;
export declare function verify(signature: Signature, hash: Hex, publicKey: PubKey): Promise<boolean>;
export declare function verifyBatch(...signatures: [Hex, Hex, Hex][]): Promise<any[]>;
export declare const utils: {
    generateRandomPrivateKey: (bytesLength?: number) => Uint8Array;
    precompute(windowSize?: number, point?: Point): Point;
};
export {};
