CREATE TABLE IF NOT EXISTS etag_cache (
	etag VARCHAR(255) NOT NULL,
	url VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT NOW(),

	PRIMARY KEY (url)
);
