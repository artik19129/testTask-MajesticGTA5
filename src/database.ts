import { createPool, Pool } from 'mysql2/promise';

export async function connect(): Promise<Pool> {
    return createPool({
        host: 'localhost',
        user: 'root',
        database: 'majestic-test-api',
        connectionLimit: 10
    });
}
