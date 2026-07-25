export default function useRestoreListening(testId) {

    try {

        const saved = localStorage.getItem(

            `listening-${testId}`

        );

        if (!saved) return null;

        return JSON.parse(saved);

    }

    catch (error) {

        console.error(

            "Failed to restore listening progress:",

            error

        );

        return null;

    }

}