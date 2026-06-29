import { useState } from "react";
import {
  Send,
  Paperclip,
  Mic,
} from "lucide-react";

export default function InputBar({
  value,
  onChange,
  onSend,
  loading,
}) {
  const [focused, setFocused] =
    useState(false);

  const MAX_LENGTH = 5000;

  function handleKeyDown(e) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      if (!loading) {
        onSend();
      }
    }
  }

  const characters = value.length;

  return (
    <div
      className={`
        rounded-2xl
        border
        transition-all
        duration-300
        ${
          focused
            ? "border-cyan-500"
            : "border-slate-700"
        }
        bg-slate-900
      `}
    >
      <textarea
        rows={4}
        value={value}
        disabled={loading}
        maxLength={MAX_LENGTH}
        placeholder="Ask NextBand AI anything..."
        onFocus={() =>
          setFocused(true)
        }
        onBlur={() =>
          setFocused(false)
        }
        onKeyDown={handleKeyDown}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          w-full
          resize-none
          bg-transparent
          outline-none
          p-5
          text-white
          placeholder:text-slate-500
        "
      />

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-800
          px-5
          py-3
        "
      >
        <div className="flex gap-3">

          {/* Future Attachment */}

          <button
            disabled
            className="
              text-slate-500
              cursor-not-allowed
            "
            title="Coming Soon"
          >
            <Paperclip size={20} />
          </button>

          {/* Future Voice */}

          <button
            disabled
            className="
              text-slate-500
              cursor-not-allowed
            "
            title="Coming Soon"
          >
            <Mic size={20} />
          </button>

        </div>

        <div className="flex items-center gap-5">

          <span
            className="
              text-xs
              text-slate-500
            "
          >
            {characters}/{MAX_LENGTH}
          </span>

          <button
            disabled={
              loading ||
              value.trim() === ""
            }
            onClick={() =>
              onSend()
            }
            className="
              h-11
              w-11
              rounded-full
              bg-cyan-500
              hover:bg-cyan-400
              disabled:bg-slate-700
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              transition
            "
          >
            <Send
              size={18}
              className="text-black"
            />
          </button>

        </div>

      </div>
    </div>
  );
}