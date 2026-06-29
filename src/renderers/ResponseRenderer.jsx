import EssayRenderer from "./EssayRenderer";

/**
 * Decide how to render AI responses.
 * Every AI feature plugs in here.
 */
export default function ResponseRenderer({
    content,
}) {

    if (
        content &&
        typeof content === "object" &&
        content.overallBand !== undefined
    ) {
        return (
            <EssayRenderer
                result={content}
            />
        );
    }

    if (typeof content === "string") {
        return (
            <p className="whitespace-pre-wrap leading-7">
                {content}
            </p>
        );
    }

    return (
        <pre className="text-sm overflow-auto">
            {JSON.stringify(
                content,
                null,
                2
            )}
        </pre>
    );
}