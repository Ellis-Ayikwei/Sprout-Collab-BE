
const sortByName = (a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  };


  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }
  
  const getInitials = (firstName, lastName) => {
    return firstName.charAt(0) + lastName.charAt(0);
}

  export {sortByName, truncateString, getInitials}