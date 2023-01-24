
CREATE TABLE IF NOT EXISTS alliance (
	alliance_id INTEGER NOT NULL,
	creator_corporation_id INTEGER NOT NULL,
	creator_id BIGINT NOT NULL,
	date_founded TIMESTAMP(3) NOT NULL,
	executor_corporation_id INTEGER,
	faction_id INTEGER,
	name TEXT NOT NULL,
	ticker TEXT NOT NULL,

	PRIMARY KEY (alliance_id)
);

CREATE TABLE IF NOT EXISTS corporation (
	corporation_id INTEGER NOT NULL,
	alliance_id INTEGER,
	ceo_id BIGINT NOT NULL,
	creator_id BIGINT NOT NULL,
	date_founded TIMESTAMP(3),
	description TEXT,
	faction_id INTEGER,
	home_station_id INTEGER,
	member_count INTEGER NOT NULL,
	name TEXT NOT NULL,
	shares INTEGER,
	tax_rate DOUBLE PRECISION NOT NULL,
	ticker TEXT NOT NULL,
	url TEXT,
	war_eligible BOOLEAN DEFAULT false,

	CONSTRAINT fk_alliance_id FOREIGN KEY (alliance_id) REFERENCES character(alliance_id) ON DELETE CASCADE ON UPDATE CASCADE,


	PRIMARY KEY (corporation_id)
);
