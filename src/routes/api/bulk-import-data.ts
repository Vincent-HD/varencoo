import { createServerFileRoute } from '@tanstack/react-start/server'
import { readCsvLinesFromStream, readMappedCsvLinesFromStream } from '../../utils/stream-csv'

export const ServerRoute = createServerFileRoute('/api/bulk-import-data').methods({
    POST: async ({ request }) => {
        const stream = request.body

        if (!stream) {
            return new Response('No data provided', { status: 400 })
        }
        // const lines = (await readCsvLinesFromStream({
        //     stream,
        //     numberOfLines: 100,
        //     separator: ';',
        //     encoding: 'iso-8859-1'
        // }).next()).value

        // console.log(lines)

        return new Response('OK', { status: 200 })
    },
})