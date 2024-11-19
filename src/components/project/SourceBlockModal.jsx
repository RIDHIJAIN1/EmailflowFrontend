import React from 'react';

export default function SourceBlockModal({ isOpen, onClose, title, description, heading, onSelect, modalType, showWaitField, onWaitOpen }) {
  if (!isOpen) return null;

  const handleOpenClick = (type) => {
    if (type === "Wait") {
      onWaitOpen(); // Open WaitModal
    } else {
      onSelect(); // Trigger selection for other cards
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div className="flex justify-between  mb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mb-4 text-left">{description}</p>
        <div className='flex justify-between'>
          <h2 className="text-lg font-semibold text-left mb-6">{heading}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">

          {modalType == '1' ?
            <SourceCard
              title={'Leads from List(s)'}
              description={'Connect multiple lists as source for this sequence.'}
              icon={"🎯"}
              onClick={() => handleOpenClick("Source")}
            />
            : ''}

          {modalType == '3' ?
            <>
              <SourceCard
                title={'Cold Email'}
                description={'Send an email to a lead'}
                icon={"📧"}
                onClick={() => handleOpenClick("Email")}
              />
              {showWaitField ?
                <SourceCard
                  title={'Wait'}
                  description={'Add some dealy'}
                  icon={"⌚"}
                  onClick={() => handleOpenClick("Wait")}
                /> : ''}
            </> : ''}
        </div>
      </div>
    </div>
  );
}

function SourceCard({ title, description, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-start p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
    >
      <div className="text-pink-500 text-2xl mr-3">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
