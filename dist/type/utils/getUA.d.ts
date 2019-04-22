interface Iua {
    [propsName: string]: boolean;
}
export declare function getUA(u: string): false | Iua;
export default getUA;
