/* eslint-disable @typescript-eslint/no-explicit-any */

interface SearchBoxProps {
    theme:string
    placeholder:string
    changeHandler?:(e: any) => void
}
const SearchBox:React.FC<SearchBoxProps> = ({theme,placeholder,changeHandler}) => {
    return (
        <>
            <div className={`${theme}-SearchBox-container`}>
                <input type="text" placeholder={placeholder} className={`${theme}-SearchBox-input`} onChange={changeHandler} />
                <img className={`${theme}-icons-Search ${theme}-SearchBox-input-icon`} alt="" />
            </div>        
        </>
    )
}

export default SearchBox