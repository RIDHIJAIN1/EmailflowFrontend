import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/apiClient";

const DropdownModal = ({ isOpen, onClose, onSelect, modalType, selectedLists }) => {
  const [search, setSearch] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [selectedListId, setSelectedListId] = useState(null);
  const [lists, setLists] = useState([]);
  const [templates, setTemplates] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch lists and templates when modal opens
    if (isOpen) {
      const fetchData = async () => {
        try {
          const listsResponse = await apiClient.get('/lists');
          const templatesResponse = await apiClient.get('/mails');
          
          // Ensure you access the 'data' key that contains the list information
          setLists(listsResponse.data?.data ?? []); // fallback to an empty array if no data
          setTemplates(templatesResponse.data?.data ?? []); // same here
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  let filteredLists;
  if (modalType == '1') {
    filteredLists = lists.filter(
      (list) =>
        list.name.toLowerCase().includes(search.toLowerCase()) &&
        !selectedLists.includes(list._id) // Exclude already selected lists
    );
  }
  else if (modalType == '3')
    filteredLists = templates.filter(list =>
      list.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleSelectList = (list) => {
    setSelectedList(list.name);
    setSelectedListId(list._id);
  };

  const handleInsertClick = () => {
    if (selectedList && selectedListId) {
      onSelect(selectedList, selectedListId); // Call the onSelect function with the selected list
      onClose(); // Close modal after insertion
    }
  };


 

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-semibold">Leads from List(s)</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                ✖
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Connect multiple lists as source for this sequence.
            </p>

            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium mb-1">Select your List(s)</label>
              {modalType == '1' ?
                <button
                  onClick={() => navigate("/createlist")}
                  className="px-4 py-1 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Create List
                </button>
                : ''}
              {modalType == '3' ?
                <button
                  onClick={() => navigate("/createTemplate")}
                  className="px-4 py-1 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Create Template
                </button>
                : ''}
            </div>
            <div className="border rounded h-40 overflow-y-auto">
              {filteredLists.map((list, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectList(list)}
                  className={`p-2 cursor-pointer hover:bg-blue-100 ${selectedList === list.name ? 'bg-blue-200' : ''
                    }`}
                >
                  {list.name}
                </div>
              ))}
            </div>

            {/* Insert Button */}
            <button
              onClick={handleInsertClick}
              disabled={!selectedList} // Disable button if no list is selected
              className={`w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${!selectedList ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              Insert
            </button>
          </div>
        </div >


      )}
    </>
  );
};

export default DropdownModal;
