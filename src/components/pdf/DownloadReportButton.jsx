import {
  Download,
} from "lucide-react";

import {
  generateEssayReport,
} from "../../services/pdf/reportGenerator";

export default function DownloadReportButton({
  essay,
}) {
  async function download() {
    await generateEssayReport(
      essay
    );
  }

  return (
    <button
      onClick={download}
      className="
      flex
      items-center
      gap-2
      rounded-xl
      bg-cyan-500
      px-6
      py-3
      font-semibold
      text-black
      hover:bg-cyan-400
      "
    >
      <Download size={18} />

      Download PDF
    </button>
  );
}