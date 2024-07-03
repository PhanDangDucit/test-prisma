import moment from 'moment';


export function formatDate(date: Date): string {
    return moment(date).format('lll')
}

export function formatDateFollowHour(date: Date): string {
    return moment(date).startOf('hour').fromNow();
}
// const ArgHandleParameter = new Map([
//     ["term", "aca"],
//     ["arg", "sdc"],
//     ["searchParams", "acacsa"]
// ]);

/**
 * Handle parameter and path name
 * @param term
 * @param arg
 */
// export const handleParameter = (term: string, arg: string) => {
//     const searchParams = useSearchParams();
//     const pathname = usePathname();
//     const { replace } = useRouter();
//     const params = new URLSearchParams(searchParams);
    
//     if(term) {
//         params.set(`${arg}`, term);
//     } else {
//         params.delete(`${arg}`);
//     }
//     replace(`${pathname}?${params.toString()}`);
// }