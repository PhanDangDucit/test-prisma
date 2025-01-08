
export const DateRange = () => {
    const dateObj = new Date();
    const monthNow = dateObj.getMonth();

    let month = monthNow;
    let dateNow = dateObj.getDate();

    let yearNow = dateObj.getFullYear();
    let year = yearNow;

    if(monthNow == 0) {
        month = 12;
        year = yearNow - 1;
    } else {
        month = monthNow - 1
    }

    const date = `${year}-${month}-${dateNow}`;

    const fromDate = new Date(date);
    const toDate = new Date();

    return {
        fromDate,
        toDate
    }
}

