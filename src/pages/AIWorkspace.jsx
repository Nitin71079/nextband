import Sidebar from "./Sidebar";
import AIOrb from "./AIOrb";
import ChatWindow from "./ChatWindow";
import RightPanel from "./RightPanel";

import "../styles/ai-workspace.css";

export default function AIWorkspace() {

  return (

    <div className="workspace-page">

      <div className="workspace">

        <Sidebar />

        <main className="workspace-main">

          <AIOrb />

          <ChatWindow />

        </main>

        <RightPanel />

      </div>

    </div>

  );

}