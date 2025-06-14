interface ReadLineFromStreamOptions {
    stream: ReadableStream<Uint8Array>
    encoding?: string
}

export async function* readLineFromStream(options: ReadLineFromStreamOptions) {
    const { stream, encoding = 'utf-8' } = options
    const reader = stream.getReader()
    const decoder = new TextDecoder(encoding)
    let buffer = ""
    try {
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            const text = decoder.decode(value, { stream: true })
            buffer += text
            // Handle different line endings: \r\n (Windows), \n (Unix), \r (Mac)
            const parts = buffer.split(/\r\n|\n|\r/)
            buffer = parts.pop() ?? ""
            for (const line of parts) {
                yield line
            }
        }
        if (buffer) {
            yield buffer
        }
    } finally {
        reader.releaseLock()
    }
}


interface ReadLinesFromStreamOptions extends ReadLineFromStreamOptions {
    numberOfLines: number
}

export async function* readLinesFromStream(options: ReadLinesFromStreamOptions) {
    const { stream, numberOfLines, encoding = 'utf-8' } = options
    if (numberOfLines <= 0) {
        throw new Error('numberOfLines must be greater than 0')
    }
    let count = 0
    let lines: string[] = []
    for await (const line of readLineFromStream({ stream, encoding })) {
        lines.push(line)
        count++
        if (count >= numberOfLines) {
            yield lines
            lines = []
            count = 0
        }
    }
    if (lines.length > 0) {
        yield lines
    }
}

interface ReadCsvLineFromStreamOptions extends ReadLineFromStreamOptions {
    stream: ReadableStream<Uint8Array>
    separator?: string
}

export async function* readCsvLineFromStream(options: ReadCsvLineFromStreamOptions) {
    const { stream, separator = ',', encoding = 'utf-8' } = options
    for await (const line of readLineFromStream({ stream, encoding })) {
        const values = line.split(separator)
        yield values
    }
}

interface ReadCsvLinesFromStreamOptions extends ReadCsvLineFromStreamOptions {
    numberOfLines: number
}

export async function* readCsvLinesFromStream(options: ReadCsvLinesFromStreamOptions) {
    const { stream, numberOfLines, separator = ',', encoding = 'utf-8' } = options
    let lines: string[][] = []
    for await (const line of readCsvLineFromStream({ stream, separator, encoding })) {
        lines.push(line)
        if (lines.length >= numberOfLines) {
            yield lines
            lines = []
        }
    }
    if (lines.length > 0) {
        yield lines
    }
}

interface ReadMappedCsvLinesOptions<T extends Array<string>> extends ReadCsvLinesFromStreamOptions {
    headers: T
}

export async function* readMappedCsvLinesFromStream<const T extends Array<string>>(options: ReadMappedCsvLinesOptions<T>) {
    const lines = (await readCsvLinesFromStream({
        stream: options.stream,
        numberOfLines: options.numberOfLines,
        separator: options.separator,
        encoding: options.encoding
    }).next()).value as string[][]
    const mappedLines = lines.map((line) => {
        return line.reduce((acc, value, index) => {
            const key = options.headers[index]
            if (key === undefined) {
                throw new Error('Could not map CSV line value to given headers')
            }
            acc[key] = value
            return acc
        }, {} as Record<string, string>)
    })
    yield mappedLines as { [key in T[number]]: string }[]
} 