// SERIALIZING A FORM TO GET THE EVENT ELEMENTS INSIDE THE FORM.
function serializeForm(form) {
    const data = Array.from(form.elements).map(element => {
        if (element.name) {
            return [element.name, element.value]
        }
    }).filter(val=>val!==undefined)
    return Object.fromEntries(data)
}

// COUNTDOWN 
const startTimer = (intervals, setDay, setTimerHours, setTimerMinutes, setTimerSecs, lockingDate,) => {

    const countdownDate = new Date(lockingDate).getTime()
    intervals = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // const hours = Math.floor((days * 24));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if (distance < 0) {
            // stop our timer
            // if (hours === 0 && minutes === 0 && seconds === 0) {
            //     setTimerHours && setTimerHours(0)
            //     setTimerMinutes && setTimerMinutes(0)
            //     setTimerSecs && setTimerSecs(0)
            // }
            clearInterval(intervals?.current)
        }
        // update timer
        else {
            setDay && setDay(days < 10 ? '0'.concat(days.toString()) : (days).toString())
            setTimerHours && setTimerHours(hours < 10 ? '0'.concat(hours.toString()) : (hours).toString())
            setTimerMinutes && setTimerMinutes(minutes < 10 ? '0'.concat(minutes.toString()) : (minutes).toString())
            setTimerSecs && setTimerSecs(seconds < 10 ? '0'.concat(seconds.toString()) : (seconds).toString())
        }
    }, 1000)
}

export const UpdateQueryParams = (pathName, paramQuery, value) => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    current.set(paramQuery, value);
    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";
    router.push(`${pathName}${query}`);
  };

export default startTimer
