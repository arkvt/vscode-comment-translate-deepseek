export type ApiType = 'openai' | 'ollama';
export type ThinkingMode = 'default' | 'disabled' | 'enabled';
export type RequestHeaders = Record<string, string>;

export function getThinkingRequestFields(
    apiType: ApiType,
    thinkingMode: ThinkingMode
): Record<string, unknown> {
    if (thinkingMode === 'default') {
        return {};
    }

    if (apiType === 'ollama') {
        return { think: thinkingMode === 'enabled' };
    }

    return { thinking: { type: thinkingMode } };
}

export function mergeRequestHeaders(
    defaultHeaders: RequestHeaders,
    customHeaders?: RequestHeaders
): RequestHeaders {
    const mergedHeaders = { ...defaultHeaders };

    if (!customHeaders || typeof customHeaders !== 'object' || Array.isArray(customHeaders)) {
        return mergedHeaders;
    }

    for (const [rawName, value] of Object.entries(customHeaders)) {
        const name = rawName.trim();
        if (!name || typeof value !== 'string') {
            continue;
        }

        const existingName = Object.keys(mergedHeaders).find(
            headerName => headerName.toLowerCase() === name.toLowerCase()
        );
        if (existingName) {
            delete mergedHeaders[existingName];
        }

        mergedHeaders[name] = value;
    }

    return mergedHeaders;
}
