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