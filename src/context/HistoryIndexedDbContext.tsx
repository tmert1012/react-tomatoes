import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from "react"
import HistoryIndexedDb from "src/context/HistoryIndexedDb.ts"
import {HistoryApiObject} from "src/api_objects/HistoryApiObject.ts"

interface HistoryIndexedDbContextValue {
    add: (history: HistoryApiObject) => void,
    getAll: () => Promise<HistoryApiObject[]>
}

/**
 * HistoryIndexedDbContext
 *
 * React context wrapper around the [HistoryIndexedDb] class.
 */
const HistoryIndexedDbContext = createContext<HistoryIndexedDbContextValue>({
    add: () => {},
    getAll: () => new Promise<HistoryApiObject[]>(() => {})
})

/**
 * HistoryIndexedDbContextProvider
 *
 * A provider for the [HistoryIndexedDbContext] context.
 */
export const HistoryIndexedDbContextProvider: FC<{
    children: ReactNode
}> = ({
    children
}) => {
    const [db] = useState(new HistoryIndexedDb("history", "history", 1))

    useEffect(
        () => {
            db.open()
            return () => db.close()
        },
        [db]
    )

    return (
        <HistoryIndexedDbContext.Provider
            value={{
                add: db.add,
                getAll: db.getAll
            }}>
            {children}
        </HistoryIndexedDbContext.Provider>
    )
}

/**
 * useHistoryIndexedDbContext
 *
 * A hook to access the [HistoryIndexedDbContext] context.
 */
export const useHistoryIndexedDbContext = () => useContext(HistoryIndexedDbContext)
