import moment from 'moment';

export function formatDate(date: Date): string {
    return moment(date).format('lll')
}

export function formatDateFollowHour(date: Date): string {
    return moment(date).startOf('hour').fromNow();
}