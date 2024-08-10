import {HistoryApiObject} from "src/api_objects/HistoryApiObject.ts"

/**
 * HistoryIndexedDb
 *
 * This class is used to interact with the IndexedDB database to store and retrieve [HistoryApiObjects].
 */
class HistoryIndexedDb {
    db: IDBDatabase | null
    dbName: string
    storeName: string
    version: number

    constructor(dbName: string, storeName: string, version: number) {
        this.db = null
        this.dbName = dbName
        this.storeName = storeName
        this.version = version
    }

    /**
     * open - open the IndexedDB database
     */
    open = () => {
        return new Promise<void>((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version)

            request.onerror = (event) => {
                console.error("Error opening IndexedDB database", event)
                reject(event)
            }

            request.onsuccess = (_) => {
                this.db = request.result
                resolve()
            }

            request.onupgradeneeded = (_) => {
                const db = request.result
                db.createObjectStore(this.storeName)
            }
        })
    }

    /**
     * close - close the IndexedDB database
     */
    close = () => {
        if (this.db) {
            this.db.close()
            this.db = null
        }
    }

    /**
     * add - add a [HistoryApiObject] to the database
     */
    add = (history: HistoryApiObject) => {
        return new Promise<void>((resolve, reject) => {
            if (this.db) {
                const transaction = this.db.transaction(this.storeName, "readwrite")
                const store = transaction.objectStore(this.storeName)
                const request = store.add(history, history.gameDate)

                request.onsuccess = (_) => {
                    resolve()
                }

                request.onerror = (event) => {
                    console.error("Error adding history to IndexedDB", event)
                    reject(event)
                }
            }
        })
    }

    /**
     * getAll - get all [HistoryApiObjects] from the database
     */
    getAll = () => {
        return new Promise<HistoryApiObject[]>((resolve, reject) => {
            if (this.db) {
                const transaction = this.db.transaction(this.storeName, "readonly")
                const store = transaction.objectStore(this.storeName)
                const request = store.getAll()

                request.onsuccess = (_) => {
                    resolve(request.result)
                }

                request.onerror = (event) => {
                    console.error("Error getting all history from IndexedDB", event)
                    reject(event)
                }
            }
        })
    }

}

export default HistoryIndexedDb