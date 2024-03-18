import '../assets/css/index.css';


function EmailFilter({ filterText, onFilterTextChange, isReadFilter, onIsReadFilter }) {
  
  
  return (
      <div className="email-search">
        <input
          type="text"
          placeholder="Search Emails"
          value={filterText}
          onChange={onFilterTextChange}
        />
      </div>
    );
  }
  export default EmailFilter;