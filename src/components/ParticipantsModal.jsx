export default function ParticipantsModal({isModalOpen = false,toggleModal,modalData}) {
  return (
    <>
      <div data-participants-modal-wrapper={isModalOpen ? "active" : "inactive"} className="absolute top-0 left-0 flex justify-center w-full h-screen bg-black/80 pointer-events-none opacity-0 transition duration-300 ease-in">
        <div className="self-start min-w-[250px] min-h-[100px] mt-30 p-4 rounded-lg bg-white">
          <h1 className="text-center text-xl font-bold">{modalData.description}</h1>
          <p className="text-center text-sm font-bold mb-4">
            {modalData.dateInEnglish && `(${modalData.dateInEnglish.day}, ${modalData.dateInEnglish.month} ${modalData.dateInEnglish.year})`}
          </p>
          <p className="text-lg font-bold">Participants</p>
          <ul className="flex flex-col gap-1">
              {modalData.participants && modalData.participants.map(participant => (
                <li>{participant.fname} {participant.role === "payer" && <span className="text-[.725rem] font-bold ml-1 bg-green-300 p-[0.25rem] rounded-lg">Payer</span>}</li>
              ))}
          </ul>
          <p className="text-center text-lg font-bold my-1">Total : PKR {modalData.total}</p>
          <button onClick={toggleModal} className="w-full mt-4 font-[500] text-sm bg-green-400 hover:bg-green-300 px-3 py-2 cursor-pointer rounded-lg">
            Close
          </button>
        </div>
      </div>
    </>
  );
}
