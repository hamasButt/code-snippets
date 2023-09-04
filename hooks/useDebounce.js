const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => clearTimeout(timeout)
    }, [value])

    return debouncedValue
}

// funtion for debouncing in a searchcall function using onchange event

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const later = () => {
        timeout = null;
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
// how to use it
  const debouncedSearchCall = debounce(
    (pageValue, rangeState, value) => facilityTableDataTriggerFunction(pageValue, rangeState, undefined, value),
    600 // 300ms delay
  );
