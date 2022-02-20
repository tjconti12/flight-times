import React, { ChangeEventHandler, useState, KeyboardEventHandler } from 'react';
import axios from 'axios';
import databaseUrl from '../../config/config';
import { IAirports, IAirline, ISearch } from '../../models/models';
import './AutoComplete.css';

type AutoCompleteProps = {
    category: string;
    stateSetter: React.Dispatch<React.SetStateAction<ISearch>>;
    currentState: ISearch;
    field: string;
}

// AutoCompleteResults, HandleChange
const AutoComplete = ({category, stateSetter, currentState, field}: AutoCompleteProps) => {

  const [searchString, setSearchString] = useState("");
  const [autoCompleteResults, setAutoCompleteResults] = useState<IAirports[] | []>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  // Index to move through the search results
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.target.value.length === 0 ? setShowSuggestions(false) : setShowSuggestions(true);
    setSearchString(event.target.value);
    axios.get(`${databaseUrl}/${category}s/?search=${searchString}`)
      .then(res => {
        setAutoCompleteResults(res.data)
      })
  }

  // Sets the value when a user clicks on a suggestion
  const onClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setShowSuggestions(false);
    // setAutoCompleteResults([]);
    setSearchString(event.currentTarget.innerText);
    let toSet = autoCompleteResults.filter((airport: IAirline | IAirports) => airport.name === event.currentTarget.innerText);
    const copyOfState = {...currentState};
    stateSetter({...copyOfState, [field]: toSet[0]});
  }

  // To cycle through suggestions
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    // console.log(event.key)
    if (event.key === "ArrowDown") {
      if (activeIndex + 1 === autoCompleteResults.length) return;
      setActiveIndex(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      if (activeIndex - 1 === -1) return;
      setActiveIndex(activeIndex - 1);
    } else if (event.key === "Enter"){
      setSearchString(autoCompleteResults[activeIndex].name);
      setShowSuggestions(false);
      setActiveIndex(0);
      const copyOfState = {...currentState};
      stateSetter({...copyOfState, [field]: autoCompleteResults[activeIndex]});
      setAutoCompleteResults([]);
    }
  }

  return (

    <div className="search-container" onKeyDown={onKeyDown}>
    <input type="search" value={searchString} onChange={handleChange} className="search-input"/>
    <ul className="search-suggestions-ul">
        {showSuggestions && autoCompleteResults.map((result, idx) => {
        return (
            <li key={result.name} className={activeIndex === idx ? "search-suggestions-li-active" : "search-suggestions-li"}
            onClick={onClick}
            >
            {result.name}
            </li>
        );
        })}
    </ul>
    </div>
  )
}

export default AutoComplete