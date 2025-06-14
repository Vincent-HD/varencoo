
import { ErrorComponentProps, Link } from '@tanstack/react-router'

export function DefaultCatchBoundary(props: ErrorComponentProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-24 w-24 text-red-500 mb-4">
                        <svg
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            className="w-full h-full"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Oops! Something went wrong
                    </h2>
                    <p className="text-gray-600 mb-6">
                        We encountered an unexpected error. Please try again or contact support if the problem persists.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Error Details</h3>

                    {props.error && (
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Error Message:</h4>
                            <p className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200 font-mono">
                                {props.error.message || props.error.toString()}
                            </p>
                        </div>
                    )}

                    {props.info && (
                        <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Additional Info:</h4>
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded border border-gray-200">
                                <pre className="whitespace-pre-wrap font-mono text-xs">
                                    {JSON.stringify(props.info, null, 2)}
                                </pre>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={props.reset}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Go Home
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Error ID: {Date.now().toString(36)}
                    </p>
                </div>
            </div>
        </div>
    )
}


