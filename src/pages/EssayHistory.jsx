import { useMemo, useState } from "react";

import useEssayHistory from "../hooks/useEssayHistory";

import EssayHistoryCard from "../components/essay/EssayHistoryCard";

import Loader from "../components/Loader";

import {
  Search,
  FileText,
  SortDesc,
} from "lucide-react";

export default function EssayHistory() {
  const {
    essays,
    loading,
    error,
  } = useEssayHistory();

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  const filteredEssays =
    useMemo(() => {
      let data = [...essays];

      data = data.filter((essay) =>
        essay.essay
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

      data.sort((a, b) => {
        const aTime =
          a.createdAt?.seconds || 0;

        const bTime =
          b.createdAt?.seconds || 0;

        return sort === "newest"
          ? bTime - aTime
          : aTime - bTime;
      });

      return data;
    }, [essays, search, sort]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">

          Essay History

        </h1>

        <p className="mt-3 text-slate-400">

          View every IELTS essay you've evaluated
          with NextBand AI.

        </p>

      </div>

      {/* Search + Sort */}

      <div className="mb-8 flex flex-col md:flex-row gap-4">

        <div
          className="
            flex-1
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
          "
        >
          <Search
            size={20}
            className="text-slate-500"
          />

          <input
            type="text"
            placeholder="Search essays..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              bg-transparent
              py-4
              outline-none
            "
          />

        </div>

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-700
            bg-slate-900
            px-4
          "
        >
          <SortDesc
            size={20}
            className="text-slate-500"
          />

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
            className="
              bg-transparent
              py-4
              outline-none
            "
          >
            <option value="newest">

              Newest First

            </option>

            <option value="oldest">

              Oldest First

            </option>

          </select>

        </div>

      </div>

      {/* Error */}

      {error && (

        <div
          className="
            mb-8
            rounded-xl
            border
            border-red-500
            bg-red-500/10
            p-5
            text-red-300
          "
        >
          {error.message}
        </div>

      )}

      {/* Empty */}

      {!loading &&
        filteredEssays.length === 0 && (

        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-slate-700
            p-20
            text-center
          "
        >

          <FileText
            size={70}
            className="
              mx-auto
              text-slate-500
            "
          />

          <h2 className="mt-6 text-2xl font-bold">

            No Essays Yet

          </h2>

          <p className="mt-3 text-slate-400">

            Complete your first AI essay evaluation
            to start tracking your progress.

          </p>

        </div>

      )}

      {/* Essays */}

      {filteredEssays.length > 0 && (

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {filteredEssays.map(
            (essay) => (

              <EssayHistoryCard
                key={essay.id}
                essay={essay}
              />

            )
          )}

        </div>

      )}

    </div>
  );
}