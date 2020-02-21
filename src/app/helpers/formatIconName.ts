/**
 * It removes n and d from icon name.
 * It also adds icon extension (svg).
 * For example when passed '01d' it returnees '01.svg'
*/

export const formatIconName = (name: string) => {
    return name[0] + name[1] + '.svg';
}