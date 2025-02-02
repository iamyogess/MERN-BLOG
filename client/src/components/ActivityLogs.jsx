import useActivityLogs from "../hooks/useActivityLogs";

const ActivityLogs = () => {
  const { data, isLoading, isError, error } = useActivityLogs();

  console.log("this is data", data);

  const getActionColor = (action) => {
    switch (action) {
      case "login_success":
        return "text-green-600";
      case "login_failed":
        return "text-yellow-600";
      case "login_blocked":
      case "account_locked":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500">Loading activities...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error: {error.message}. Please make sure you are logged in.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Activity Log
      </h2>
      {data.length === 0 ? (
        <div className="text-center text-gray-500">No activities found.</div>
      ) : (
        <ul className="space-y-4">
          {data.map((log) => (
            <li key={log._id} className="p-4 bg-white shadow-md rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {log.description}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
              <p className={`mt-2 ${getActionColor(log.action)}`}>
                Action: {log.action.replace("_", " ").toUpperCase()}
              </p>
              {/* Username and Email */}
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  <strong>Username:</strong> {log._id}
                </p>
                <p>
                  <strong>Username:</strong> {log.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {log.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLogs;
