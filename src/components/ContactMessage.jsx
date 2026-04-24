export default function ContactMessage({ name, email, message }) {
  return (
    <div className="flex max-w-screen justify-center items-center">
      <div className=" min-w-80 bg-gray-800 p-2 text-xs rounded-lg shadow">
        <div className="bg-gray-600 text-white rounded-sm p-4">
          <p className="font-bold text-center">name: {name}</p>
          <p
            className=" font-bold 
        text-center"
          >
            {email}
          </p>
        </div>

        {/* <div className="p-2">
          <hr />
        </div> */}
        <div className="b p-4 text-white">
          <p>
            {" "}
            <p className="text-blue-300">message: </p>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
