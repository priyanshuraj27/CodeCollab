import React, { useState } from "react";
import ParticipantsList from "./participants";
import { X } from "lucide-react";
import ParticipantsSidebar from "./allParticipant";

const YourPage = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const projectId = "66387fba2573b69a5a169e75";

  return (
    <div>
      <button
        onClick={() => setShowSidebar(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Show Participants
      </button>

      {showSidebar && (
        <ParticipantsSidebar
          projectId={projectId}
          onClose={() => setShowSidebar(false)}
          darkMode={false}
        />
      )}
    </div>
  );
};

export default YourPage;
