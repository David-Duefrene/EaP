CREATE TABLE IF NOT EXISTS bloodlines (
	bloodline_id INTEGER NOT NULL,
	charisma INTEGER NOT NULL,
	corporation_id INTEGER NOT NULL,
	description text NOT NULL,
	intelligence INTEGER NOT NULL,
	memory INTEGER NOT NULL,
	name text NOT NULL,
	perception INTEGER NOT NULL,
	race_id INTEGER NOT NULL,
	ship_type_id INTEGER,
	willpower INTEGER NOT NULL,

	PRIMARY KEY (bloodline_id)
);

CREATE TABLE IF NOT EXISTS races (
	alliance_id INTEGER NOT NULL,
	description text NOT NULL,
	name text NOT NULL,
	race_id INTEGER NOT NULL,

	PRIMARY KEY (race_id)
);

CREATE TABLE IF NOT EXISTS structure (
	structure_id BIGINT NOT NULL,
	name text NOT NULL,
	owner_id INTEGER NOT NULL,
	solar_system_id INTEGER NOT NULL,
	position_x DOUBLE PRECISION,
	position_y DOUBLE PRECISION,
	position_z DOUBLE PRECISION,
	type_id INTEGER,

	PRIMARY KEY (structure_id)
);
