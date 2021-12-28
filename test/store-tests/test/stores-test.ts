// /test/stores-test.ts
// Tests the rate limiter with various different stores

import request from 'supertest'

import redisStore from '../source/redis-store.js'
import mongoStore from '../source/mongo-store.js'
import memcachedStore from '../source/memcached-store.js'
import preciseStore from '../source/precise-store.js'

for (const [name, app] of [
	['redis', redisStore],
	['mongo', mongoStore],
	['memcached', memcachedStore],
	['precise', preciseStore],
]) {
	console.log('should work for %s store', name)

	await request(app).get('/').expect(200)
	await request(app).get('/').expect(200)
	await request(app).get('/').expect(200)
	await request(app).get('/').expect(429)

	console.log('worked for %s store', name)
}

process.exit(0)
