const useToggle = (defaultValue) => {
    const [value, setToggleValue] = useState(defaultValue)

    function toggleFunction() {
        setToggleValue(currentState => {
            typeof value === 'boolean' ? value : !currentState
        })
    }

    return [value, setToggleValue]
}