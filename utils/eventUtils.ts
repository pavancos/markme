import { BE_URL } from "@/constants/config";
export async function markmeEvent(eventId: string, token: string) {
    try {
        const response = await fetch(`${BE_URL}/user/event/markme`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                eventId
            })
        });

        return response.json();
    } catch (err) {
        console.log(err);
    }
}
export async function unMarkmeEvent(eventId: string, token: string) {
    try {
        const response = await fetch(`${BE_URL}/user/event/unmarkme`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                eventId
            })
        });

        return response.json();
    } catch (err) {
        console.log(err);
    }
}