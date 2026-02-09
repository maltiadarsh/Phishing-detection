/**
 * API Service for Phishing Detection Backend
 * Handles all communication with Flask backend
 */

export interface CheckUrlResponse {
    url: string;
    is_safe: boolean;
    prediction: string;
    confidence: number;
    threat_level: string;
    reason?: string;
}

export interface CheckUrlRequest {
    url: string;
}

/**
 * Check if a URL is safe or phishing
 * @param url - The URL to check
 * @returns Promise with the scan result
 * @throws Error if the API call fails
 */
export async function checkUrl(url: string): Promise<CheckUrlResponse> {
    try {
        const response = await fetch('/api/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: CheckUrlResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking URL:', error);
        throw new Error('Failed to scan URL. Please try again.');
    }
}
